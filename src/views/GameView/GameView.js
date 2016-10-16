import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as historyActions } from '../../redux/modules/history'
import { actions as roundActions } from '../../redux/modules/round'
import { actions as resizeActions } from '../../redux/modules/resize'
import { actions as playActions } from '../../redux/modules/play'
import { Board } from './Board'
import { RoundControls } from './RoundControls'

const SKIP_SIZE = 10

// There must be a better way//move to constructor??? middleware??
var lastTimeout, wasPlaying
var finishTimeout = (setSize, roundNum) => {
  if (lastTimeout === roundNum) {
    setSize(roundNum + 1)
  }
}

const mapStateToProps = (state) => ({
  history: state.history,
  round: state.round,
  play: state.play,
  size: state.resize,
})

const mapDispatchToProps = (dispatch) => ({
  fetchHistory: bindActionCreators(historyActions.fetchHistory, dispatch),
  setRound: bindActionCreators(roundActions.setRound, dispatch),
  setPlaying: bindActionCreators(playActions.setPlaying, dispatch),
})

export class GameView extends React.Component {

	constructor(props, context) {
    super(props, context);
    // TODO: only fetch if not already loaded
    props.fetchHistory(props.params.gameID)
	}

  componentWillReceiveProps(newProps) {
    wasPlaying = newProps.play.playing
    if (newProps.play.playing && newProps.history.maps.length -1 === newProps.round.num) {
      newProps.setPlaying(false)
      return
    }

    if (newProps.history.maps && newProps.play.playing && newProps.history.maps.length -1 > newProps.round.num) {
      setTimeout(() => finishTimeout(newProps.setRound, newProps.round.num), 250)
      lastTimeout = newProps.round.num
    }
  }

  render () {
    if (!this.props.history.maps) return <div/>
    return (
      <div className='page-container'>
        <RoundControls
          playing={this.props.play.playing}
          setPlaying={this.props.setPlaying}
          setRound={this.props.setRound}
          roundNum={this.props.round.num}
          maxRound={this.props.history.maps.length - 1}/>
        <Board
          actions={[]}
          size={this.props.size}
          board={this.props.history.maps[this.props.round.num]}/>
      </div>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView)
