import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Well, Input, Panel, Button, Table } from 'react-bootstrap';
import { actions as projectActions } from '../../redux/modules/projects'
import { actions as gametypeActions } from '../../redux/modules/gametypes'
import { NewProjectModal } from '../../components/NewProjectModal'
import { IDToModel } from '../../utils/utils'
require('./MyProjects.scss')

const mapStateToProps = (state) => ({
  user: state.user,
  projects: state.projects,
  gametypes: state.gametypes,
})

const mapDispatchToProps = (dispatch) => ({
  replace: bindActionCreators(replace, dispatch),
  createProject: bindActionCreators(projectActions.createProject, dispatch),
})

export class MyProjects extends React.Component {
  renderRows () {
    return this.props.projects.map( project => {
      // TODO: removing loading when on load waits for data
      let gameType = IDToModel(project.gameTypeID, this.props.gametypes)
      return( <tr key={project.ID} >
        <td>{project.name}</td>
        <td>{gameType ? gameType.name : 'loading'}</td>
        <td>{project.language}</td>
        <td onClick={() => this.props.replace(`project/${project.ID}`)}><a>Go to workspace</a></td>
        <td onClick={() => this.props.replace(`project/${project.ID}/games`)}><a>Games</a></td>
      </tr>
    )})
  }

  renderTable() {
    return (<Table striped condensed hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Game Type</th>
          <th>Language</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </Table>)
  }

  renderNoProjects() {
    return (<h4 className='no-projects-content'>You have not started any projects yet, click the plus sign above to get started</h4>)
  }

  renderPanelContent () {
    if (this.props.projects.length === 0) {
      return this.renderNoProjects()
    }
    return this.renderTable()
  }

  render () {
    return (
      <Panel header={
          <div>
            <span>My Projects</span>
            <span
              className={'add-project-modal-launcher'}>
            <NewProjectModal
              gameTypes={this.props.gametypes}
              push={this.props.replace}
              createProject={this.props.createProject}/></span>
          </div>}>
          {this.renderPanelContent()}
      </Panel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects)
