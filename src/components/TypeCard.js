import { Thumbnail, OverlayTrigger, Popover } from 'react-bootstrap'
import { STORAGE_URL } from '../utils/constants'

export class TypeCard extends React.Component {
  iconUrl () {
    return `${STORAGE_URL}/icon-${this.props.type.ID}.png`
  }

  renderIcon() {
    // hack to not render icon for move types
    if (this.props.type.takesDelayFromTerrain) return
    return <img src={this.iconUrl()} />
  }

  overlay () {
    return (<Popover id={`popover-${this.props.type.ID}`}>
      {this.renderIcon()}
      <h3>{this.props.type.name}</h3>
      <div
        onClick={() => this.props.replace(`/type/${this.props.type.ID}`)}>
        More Info
      </div>
    </Popover>)
  }

  render () {
    return (<div
      className='foo'
      style={{display: "inline-block"}}>
      <OverlayTrigger
        trigger="click"
        rootClose
        overlay={this.overlay()}>
          <div>{this.props.type.name}</div>
      </OverlayTrigger>
    </div>)
  }
}
