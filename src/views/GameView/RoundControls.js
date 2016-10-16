import { Glyphicon } from 'react-bootstrap'
import styles from './GameView.scss'

export class RoundControls extends React.Component {

  getPlayPause() {
    if (this.props.playing)
      return (<Glyphicon
        glyph="pause"
        onClick={(e) => this.props.setPlaying(false)} />)
    return (<Glyphicon
      glyph="play"
      onClick={(e) => this.props.setPlaying(true)} />)
  }

  render () {
    return (
      <div className={styles['controlscontainer']}>
        {this.getPlayPause()}
        <Glyphicon
          className={styles["ctrlicon"]}
          glyph="backward"
          onClick={(e) => this.props.setRound(Math.max(0, this.props.roundNum - 1))} />
        <Glyphicon
          className={styles["ctrlicon"]}
          glyph="forward"
          onClick={(e) => this.props.setRound(Math.min(this.props.maxRound, this.props.roundNum + 1))} />
        <Glyphicon
          className={styles["ctrlicon"]}
          glyph="fast-backward"
          onClick={(e) => this.props.setRound(Math.max(0, this.props.roundNum - SKIP_SIZE))} />
        <Glyphicon
          className={styles["ctrlicon"]}
          glyph="fast-forward"
          onClick={(e) => this.props.setRound(Math.min(this.props.maxRound, this.props.roundNum + SKIP_SIZE))} />
        <input
          key={"input" + this.props.roundNum}
          type="range"
          min={0}
          max={this.props.maxRound}
          defaultValue={this.props.roundNum}
          step={1}
          onInput={(e) => this.props.setRound(Number(e.target.value))} />
      </div>
    )
  }
}
