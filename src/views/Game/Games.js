import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Input, Table } from 'react-bootstrap'
import { IDToModel } from '../../utils/utils'
import { TypeCard } from '../../components/TypeCard'
import { Loading } from '../../components/Loading'
import { actions as gamesActions } from '../../redux/modules/games'
const mapStateToProps = (state) => ({
  games: state.games,
  projects: state.projects,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  fetchGamesForProject: bindActionCreators(gamesActions.fetchGamesForProject, dispatch),
  replace: bindActionCreators(replace, dispatch),
})

export class Games extends React.Component {
  projectID = () => this.props.params.projectID
  project = () => IDToModel(this.projectID(), this.props.projects)
  projects = () => this.props.projects

  componentWillMount() {
    if (!this.games()) {
      this.props.fetchGamesForProject(this.projectID())
    }
  }

  games () {
    let projectID = this.projectID()
    if (!projectID) return null
    return this.props.games[projectID]
  }

  projectSelect() {
    let projects = this.projects()
    return (<Input
      label="Project"
      onChange={(e) => this.props.replace(sprintf("/project/%s/games", e.target.value))}
      type="select">
      {projects == null ? (<option key="select" >select project</option>) : null}
      {projects.map(project => <option key={project.ID} value={project.ID}>{project.name}</option> )}
    </Input>)
  }

  loadingGames () {
    return (<Loading contentType='games'/>)
  }

  noGames () {
    return (<h4 className='no-games-content'>No games exist for this project. Start some games here</h4>)
  }

  gameTable (games) {
    return (  <Table striped condensed hover>
      <thead>
        <tr>
          <th>Game ID</th>
          <th>Complete</th>
          <th>Won</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {this.gameRows(games)}
      </tbody>
    </Table>)
  }

  gameRows(games) {
    return games.map(game => {
      return (<tr key={game.ID} >
        <td>{game.ID}</td>
        <td>{`${game.complete}`}</td>
        <td>{`${game.winningTeam == this.props.user.ID}`}</td>
        <td onClick={() => this.props.replace(`/project/${this.props.params.projectID}/game/${game.ID}/viewer`)}><a>View</a></td>
      </tr>)
    })
  }

  renderGames (project) {
    let games = this.games()
    if (!games) {
      return this.loadingGames()
    }

    if (games.loading) {
      return this.loadingGames()
    }

    if (games.games.length === 0) {
      return this.noGames()
    }

    return this.gameTable(games.games)
  }

  render () {
    let project = this.project()
    if (project === null) {
      return this.projectSelect(project)
    }

    return (<div>
      <h1>{project.name}</h1>
      {this.renderGames(project)}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Games)
