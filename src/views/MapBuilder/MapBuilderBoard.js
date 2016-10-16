import styles from './Board.scss'
import { findDOMNode } from 'react-dom'
import { LOCATION_INFO_IDS } from '../../utils/constants'
import { LocInfoIDToTypesID } from '../../utils/utils'
import { STORAGE_URL } from '../../utils/constants'

const GAME_VIEW_WIDTH = 0.5625
const GAME_VIEW_HEGIHT = 0.8

export class MapBuilderBoard extends React.Component {

  componentDidMount() {
    this.initDimensions(this.props)
    this.canvas = findDOMNode(this);
    this.ctx = this.canvas.getContext('2d')
    this.drawLayer(this.props)
    this.prevMouseOver = null
  }

  componentWillReceiveProps(props) {
    this.initDimensions(props)
    if (this.ctx) this.drawLayer(props)
  }

  initDimensions(props) {
    var maxWidth = props.size.width * GAME_VIEW_WIDTH
    var maxHeight = props.size.height * GAME_VIEW_HEGIHT

    this.squareSize = maxWidth / this.props.board.length
    if (maxWidth / props.board.length > maxHeight / props.board[0].length) {
      this.squareSize = maxHeight / props.board[0].length
    }

    this.width = this.squareSize * props.board.length
    this.height = this.squareSize * props.board[0].length
  }

  drawHover(e) {
    var {top, left} = this.canvas.getBoundingClientRect()
    var cleft = e.clientX - Math.floor(left)
    var ctop = e.clientY - Math.floor(top)
    var x = Math.floor(cleft / this.squareSize)
    var y = Math.floor(ctop / this.squareSize)

    if (this.prevMouseOver !== null) {
      if (x === this.prevMouseOver.x && y === this.prevMouseOver.y) return
      this.clearPrevHover()
    }

    this.prevMouseOver = {
      x: x,
      y: y,
    }

    console.log("drawHover")
    this.drawHoverImage(LOCATION_INFO_IDS.TERRAIN, x, y)
    this.drawHoverImage(LOCATION_INFO_IDS.BOT, x, y)
    this.drawHoverImage(LOCATION_INFO_IDS.ITEM, x, y)
  }

  clearPrevHover() {
    console.log("clearPrevHover")
    this.drawLocInfoImage(LOCATION_INFO_IDS.TERRAIN, this.prevMouseOver.x, this.prevMouseOver.y)
    this.drawLocInfoImage(LOCATION_INFO_IDS.BOT, this.prevMouseOver.x, this.prevMouseOver.y)
    this.drawLocInfoImage(LOCATION_INFO_IDS.ITEM, this.prevMouseOver.x, this.prevMouseOver.y)
    this.prevMouseOver = null
  }

  drawHoverImage(locInfoID, x, y) {
    // if the editing class is for the type for locInfoID draw the editingType
    // otherwise draw whatever is already at that spot for the locInfoID
    var typeID = LocInfoIDToTypesID(locInfoID)
    if (this.props.editingClass == typeID) {
      var iconUrl = `${STORAGE_URL}/icon-${this.props.editingType}.png`
      this.drawImage(iconUrl, x, y)
    } else {
      this.drawLocInfoImage(locInfoID, x, y)
    }
  }

  drawLocInfoImage(locInfoID, x, y) {
    var typeID = this.props.board[x][y][locInfoID]
    if (locInfoID === LOCATION_INFO_IDS.BOT) {
      typeID = typeID["typeID"]
    }

    if (!typeID) return

    var iconUrl = `${STORAGE_URL}/icon-${typeID}.png`
    this.drawImage(iconUrl, x, y)
  }

  drawImage(iconUrl, x, y) {
    let img = new Image()
    img.src = iconUrl
    img.addEventListener("load", function() {
      this.ctx.drawImage(img, x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize)
    }.bind(this), false);
  }

  drawLayer(props) {
    for (var i = 0; i < props.board.length; i++) {
      for (var j = 0; j < props.board[i].length; j++) {
        this.drawLocInfoImage(LOCATION_INFO_IDS.TERRAIN, i, j)
        this.drawLocInfoImage(LOCATION_INFO_IDS.BOT, i, j)
        this.drawLocInfoImage(LOCATION_INFO_IDS.ITEM, i, j)
      }
    }
  }

  updateLocationInfo(e) {
    var {top, left} = this.canvas.getBoundingClientRect()
    var cleft = e.clientX - Math.floor(left)
    var ctop = e.clientY - Math.floor(top)
    var x = Math.floor(cleft / this.squareSize)
    var y = Math.floor(ctop / this.squareSize)
    this.props.updateLocationInfo({
      x: x,
      y: y,
    })
  }

  render () {
    return (
      <canvas
        top={0}
        left={0}
        onMouseEnter={this.drawHover.bind(this)}
        onMouseLeave={this.clearPrevHover.bind(this)}
        onMouseMove={this.drawHover.bind(this)}
        onClick={this.updateLocationInfo.bind(this)}
        className={styles['canvascenter']}
        width={this.width}
        height={this.height}/>)
  }
}
