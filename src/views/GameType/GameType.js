import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Table, DropdownButton, MenuItem } from 'react-bootstrap'
import { IDToModel } from '../../utils/utils'
import { TypeCard } from '../../components/TypeCard'
import { NewProjectModal } from '../../components/NewProjectModal'
import { STORAGE_URL } from '../../utils/constants'

const mapStateToProps = (state) => ({
  gametypes: state.gametypes,
  types: state.types,
})

// const mapDispatchToProps = (dispatch) => ({
//   fetchHistory: bindActionCreators(historyActions.fetchHistory, dispatch),
// })

export class GameType extends React.Component {

  gameType () {
    if (!this.props.params.gameTypeID) return null
    return IDToModel(this.props.params.gameTypeID, this.props.gametypes)
  }

  gameTypeSelect(gt) {
    return (<Input
      label="GameType"
      onChange={(e) => this.props.replace(sprintf("gametype/%s", e.target.value))}
      type="select">
      {gt == null ? (<option key="select" >select game type</option>) : null}
      {this.props.gametypes.map(gametype => <option key={gametype.ID} value={gametype.ID}>{gametype.name}</option> )}
    </Input>)
  }

  renderApiInfo(gt) {
    return (<div>
      <h4>API</h4>
      {gt.apiFuncs.map(f => <div key={f}>{f}</div>)}
    </div>)
  }

  renderTableItems(typeKeys, types) {
    if (!typeKeys) return <td/>
    return (<td>
      {typeKeys.map(typeKey => <div key={typeKey}>{this.renderLabels(IDToModel(typeKey, types))}</div>)}
    </td>)
  }

  renderLabels(t) {
    return (<TypeCard
      type={t}/>)
  }

  renderDocs(gametype) {
    let docs = ['api', 'ids']
    return (<DropdownButton bsStyle="info" title="Docs" id="basic-btn-dropdown">
        {docs.map( doc => (
          <MenuItem
            onClick={() => window.open(`${STORAGE_URL}/docs-${doc}-${gametype.ID}.html`, '_blank')}
            key={doc}
            eventKey={doc}>{doc}</MenuItem>))}
      </DropdownButton>)
  }

  renderTypeTable(gt) {
    return(<Table striped condensed hover>
      <thead>
        <tr>
          <th>Bot Types</th>
          <th>Item Types</th>
          <th>Terrain Types</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {this.renderTableItems(gt.botTypes, this.props.types.botTypes)}
          {this.renderTableItems(gt.itemTypes, this.props.types.itemTypes)}
          {this.renderTableItems(gt.terrainTypes, this.props.types.terrainTypes)}
        </tr>
      </tbody>
    </Table>)
  }

  renderMetadataItem(key, val) {
    return (<div>
      <span>{key}</span>
      <span>{`: ${val}`}</span>
    </div>)
  }

  renderMetadata(gt) {
    return (<div>
      {this.renderMetadataItem("Version", gt.version)}
      {this.renderMetadataItem("Number of Teams", gt.numTeams)}
      {this.renderMetadataItem("Description", gt.description)}
    </div>)
  }

  render () {
    let gameType = this.gameType()
    if (gameType === null) {
      return this.gameTypeSelect(gameType)
    }

    return (<div>
      <h1>{gameType.name} <NewProjectModal
        gameType={gameType}/></h1>
      {this.renderMetadata(gameType)}
      <br/>
      {this.renderDocs(gameType)}
      <br/>
      <br/>
      {this.renderApiInfo(gameType)}
      <br/>
      {this.renderTypeTable(gameType)}
    </div>)
  }
}

export default connect(mapStateToProps, null)(GameType)
