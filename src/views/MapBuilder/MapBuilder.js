import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { actions as mapBuilderActions } from '../../redux/modules/mapCreator'
import { constants } from '../../utils/constants'
import { MapBuilderBoard } from './MapBuilderBoard'
import { PropsSelector } from './PropsSelector'
import { Input, Grid, Row, Col } from 'react-bootstrap';
import { sprintf } from 'sprintf-js'

const mapStateToProps = (state) => ({
  gametypes: state.gametypes,
  types: state.types,
  mapCreator: state.mapCreator,
  size: state.resize,
})

const mapDispatchToProps = (dispatch) => ({
  setX: bindActionCreators(mapBuilderActions.setX, dispatch),
  setY: bindActionCreators(mapBuilderActions.setY, dispatch),
  setCurrentTeam: bindActionCreators(mapBuilderActions.setCurrentTeam, dispatch),
  setDefaultTerrain: bindActionCreators(mapBuilderActions.setDefaultTerrain, dispatch),
  updateLocationInfo: bindActionCreators(mapBuilderActions.updateLocationInfo, dispatch),
  setEditingClass: bindActionCreators(mapBuilderActions.setEditingClass, dispatch),
  setEditingType: bindActionCreators(mapBuilderActions.setEditingType, dispatch),
  submitMap: bindActionCreators(mapBuilderActions.submitMap, dispatch),
  setName: bindActionCreators(mapBuilderActions.setName, dispatch),
  replace: bindActionCreators(replace, dispatch),
})

export class MapBuilder extends React.Component {

  componentWillReceiveProps(newProps) {
    if (!this.props.mapCreator.defaultTerrain && newProps.types[constants.TERRAIN_TYPES].length > 0) newProps.setDefaultTerrain(newProps.types[constants.TERRAIN_TYPES][0].ID)
    if (!this.props.mapCreator.editingType && newProps.types[newProps.mapCreator.editingClass].length > 0) newProps.setEditingType(newProps.types[newProps.mapCreator.editingClass][0].ID)
  }

  gameType () {
    if (!this.props.params.gameTypeID) return null
    for (var i in this.props.gametypes) {
      if (this.props.gametypes[i].ID == this.props.params.gameTypeID) return this.props.gametypes[i]
    }
    return null
  }

  gameTypeSelect() {
    var gt = this.gameType()
    return (<Input
      label="GameType"
      onChange={(e) => this.props.replace(sprintf("mapbuilder/%s", e.target.value))}
      type="select">
      {gt == null ? (<option key="select" >select game type</option>) : null}
      {this.props.gametypes.map(gametype => <option key={gametype.ID} value={gametype.ID}>{gametype.name}</option> )}
    </Input>)
  }

  hoverOverlay (s) {
    return (<img
      src={this.props.types[this.props.mapCreator.editingType].iconUrl}
      style={s}
    />)
  }

  render () {
    var gameType = this.gameType()
    if (gameType == null) {
      return this.gameTypeSelect()
    }
    if (!this.props.mapCreator.mapDefinition[0][0]) return <div/>
    return (<Grid>
      <Row>
        <Col md={3}>
          {this.gameTypeSelect()}
          <PropsSelector
            mapCreator={this.props.mapCreator}
            types={this.props.types}
            gameType={gameType}
            setX={this.props.setX}
            setY={this.props.setY}
            setDefaultTerrain={this.props.setDefaultTerrain}
            setEditingClass={this.props.setEditingClass}
            setEditingType={this.props.setEditingType}
            setCurrentTeam={this.props.setCurrentTeam}
            setName={this.props.setName}
            submitMap={this.props.submitMap}/>
        </Col>
        <Col md={9}>
          <MapBuilderBoard
            types={this.props.types}
            editingType={this.props.mapCreator.editingType}
            size={this.props.size}
            editingClass={this.props.mapCreator.editingClass}
            updateLocationInfo={this.props.updateLocationInfo}
            board={this.props.mapCreator.mapDefinition}/>
        </Col>
      </Row>
    </Grid>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapBuilder)
