import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Button, Table, Panel } from 'react-bootstrap'

import { actions as projectActions } from '../../redux/modules/projects'
import { NewProjectModal } from '../../components/NewProjectModal.js'
import { GameStarter } from '../../components/GameStarter.js'

const mapStateToProps = (state) => ({
  user: state.user,
  gametypes: state.gametypes,
})

const mapDispatchToProps = (dispatch) => ({
  replace: bindActionCreators(replace, dispatch),
  createProject: bindActionCreators(projectActions.createProject, dispatch),
})

export class GameTypes extends React.Component {
  renderRows() {
    return this.props.gametypes.map( gt => (
      <tr key={gt.ID} >
        <td>{gt.name}</td>
        <td>{gt.numTeams}</td>
        <td>{gt.languages}</td>
        <td>
          <NewProjectModal
            gameType={gt}
            push={this.props.replace}
            createProject={this.props.createProject}>
            New Project
          </NewProjectModal>
        </td>
        <td onClick={() => this.props.replace('/gametype/' + gt.ID)}>More Info</td>
      </tr>
    ))
  }

  render () {
    return (<Panel>
        <Table striped condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Teams</th>
            <th>Languages</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </Table>
    </Panel>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTypes)
