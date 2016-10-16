import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replace } from 'react-router-redux'
import { IDToModel } from '../../utils/utils'
import { Input } from 'react-bootstrap'
import { actions as gamesActions } from '../../redux/modules/games'

const mapStateToProps = (state) => ({
  games: state.games,
})

const mapDispatchToProps = (dispatch) => ({
  fetchGamesForProject: bindActionCreators(gamesActions.fetchGamesForProject, dispatch),
  replace: bindActionCreators(replace, dispatch),
})

export class Game extends React.Component {
  games () {
    let projectID = this.props.params.projectID
    if (!projectID) return null
    let games = this.props.games[projectID]
    if (!games) {
      this.props.fetchGamesForProject(projectID)
      return {loading: true}
    }
    return games
  }

  game () {
    let games = this.games()
    if (games === null) return null
    let gameID = this.props.params.gameID
    if (!gameID) return null
    if (games.loading) {
      return games
    }
    return IDToModel(gameID, games.games)
  }

  // gameSelect(game) {
  //   return (<Input
  //     label="Game"
  //     onChange={(e) => this.props.replace(sprintf("gametype/%s", e.target.value))}
  //     type="select">
  //     {game == null ? (<option key="select" >select game type</option>) : null}
  //     {this.props.gametypes.map(gametype => <option key={gametype.ID} value={gametype.ID}>{gametype.name}</option> )}
  //   </Input>)
  // }

  render () {
    let game = this.game()
    if (game === null) {
      return (<h1>Game not found</h1>)
    }
    if (game.loading) {
      return (<h1>Loading</h1>)
    }

    let viewLink = null
    if (game.complete) {
      viewLink = (<a onClick={(e) => this.props.replace(`/project/${this.props.params.projectID}/game/${game.ID}/viewer`)}>View Game</a>)
    }

    return (<div>
      <h1>Game ID: {game.ID}</h1>
      <h1>Complete: {`${game.complete}`}</h1>
      {viewLink}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
