import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Nav, NavItem } from 'react-bootstrap';
import { replace } from 'react-router-redux'
import { actions as gameTypeCreatorActions } from '../../redux/modules/gameTypeCreator'
import { actions as typeCreatorsActions } from '../../redux/modules/typeCreators'
import { constants } from '../../utils/constants'
import { TypeCreator } from './TypeCreator'
import { GameTypeCreator } from './GameTypeCreator'
import { getAttributeMaps } from '../../utils/attributToComponentMaps'
import { sprintf } from 'sprintf-js'

const mapStateToProps = (state) => ({
  types: state.types,
  typeCreators: state.typeCreators,
  gameTypeCreator: state.gameTypeCreator,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  replace: bindActionCreators(replace, dispatch),
	updateTypeGT: bindActionCreators(gameTypeCreatorActions.updateTypeGT, dispatch),
  updateAPIFuncs: bindActionCreators(gameTypeCreatorActions.updateAPIFuncs, dispatch),
  setCode: bindActionCreators(gameTypeCreatorActions.setCode, dispatch),
  setName: bindActionCreators(gameTypeCreatorActions.setName, dispatch),
  setNumTeams: bindActionCreators(gameTypeCreatorActions.setNumTeams, dispatch),
  submitGameType: bindActionCreators(gameTypeCreatorActions.submitGameType, dispatch),
  updateType: bindActionCreators(typeCreatorsActions.updateType, dispatch),
  submitType: bindActionCreators(typeCreatorsActions.submitType, dispatch),
})

export class CreatorView extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  content() {
    var attributeMaps = getAttributeMaps()
    var creatorType = this.props.params.creatorType
    if (constants.CREATABLE_TYPES.indexOf(creatorType) != -1) {
      return <TypeCreator
        submitType={this.props.submitType}
        creatorType={creatorType}
        component_map={attributeMaps[creatorType]}
        updateType={this.props.updateType}
        types={this.props.types}
        creator={this.props.typeCreators[creatorType]}/>
    }

    if(creatorType === constants.GAME_TYPE) {
      return <GameTypeCreator
        user={this.props.user}
        submitGameType={this.props.submitGameType}
        updateTypeGT={this.props.updateTypeGT}
        updateAPIFuncs={this.props.updateAPIFuncs}
        setCode={this.props.setCode}
        setName={this.props.setName}
        setNumTeams={this.props.setNumTeams}
        types={this.props.types}
        creator={this.props.gameTypeCreator}/>
    }

    return (<div>Invalid URL</div>)
  }

  render () {
    return (<div
        key={"creator-view"}>
      <Nav
        bsStyle="tabs"
        activeKey={this.props.params.creatorType}
        onSelect={(eventKey) => this.props.replace(sprintf("/creator/%s", eventKey))}>
          {[constants.GAME_TYPE].concat(constants.CREATABLE_TYPES).map( creator => <NavItem key={creator} eventKey={creator}>{creator}</NavItem>)}
      </Nav>
      {this.content()}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatorView)
