import { findDOMNode } from 'react-dom'
import { LOCATION_INFO_IDS } from '../../utils/constants'
import { LocInfoIDToTypesID } from '../../utils/utils'
import { STORAGE_URL } from '../../utils/constants'

const GAME_VIEW_WIDTH = 0.5625
const GAME_VIEW_HEGIHT = 0.8

export class Board extends React.Component {

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


  drawLocInfoImage(locInfoID, x, y) {
    var typeID = this.props.board[x][y][locInfoID]
    if (locInfoID === LOCATION_INFO_IDS.BOT && typeID !== null) {
      typeID = typeID["botTypeID"]
    } else if (locInfoID === LOCATION_INFO_IDS.ITEM && typeID !== null) {
      typeID = typeID["itemTypeID"]
    }

    if (typeID === null){
      return
    }

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


  render () {
    return (
      <canvas
        top={0}
        left={0}
        className={'canvascenter'}
        width={this.width}
        height={this.height}/>)
  }
}
