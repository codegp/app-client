import { Input, Button } from 'react-bootstrap'
import { CodegpModal } from './CodegpModal'
var request = require('axios');
import { CreateUrl } from '../utils/utils'

export class GameStarter extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
    };
  }

  onSubmit () {
    this.setState({loading: true})
    let mapID = this.refs.mapSelect.getValue()
    let url = CreateUrl(`project/${this.props.projectID}/map/${mapID}/game`)
    this.props.createGameForProject(this.props.projectID, mapID)
  }

  renderBody () {
    return (<div>
        {this.mapSelect()}
      </div>)
  }

  mapSelect () {
    return (<Input
      ref="mapSelect"
      type="select"
      label="Choose Map">
      {this.mapOptions()}
    </Input>)
  }

  mapOptions() {
    return this.props.gametype.mapIDs.map((mapID) => (<option
      key={mapID}
      value={mapID}>
      {mapID}
    </option>))
  }

  renderFooter () {
    return (<Button onClick={(e) => this.onSubmit()}>Start Game</Button>)
  }

  render () {

    // TODO: more sofisticated game started with callenges

    // if (this.props.gametype.numTeams === 1) {
    //   return (<Button
    //       onClick={() => this.onSubmit({})} // no post data for single player game
    //       disabled={this.state.loading}>
    //       Start Game
    //     </Button>);
    // }

    return (<CodegpModal
        spanText="Start Match"
        title="Start Match"
        modalBody={this.renderBody()}
        modalFooter={this.renderFooter()} />)

    // return (<Button
    //     onClick={() => this.onSubmit({})} // no post data for matchmaking game
    //     disabled={this.state.loading}>
    //     Start Game
    //   </Button>);
  }
}
