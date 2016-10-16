import { Glyphicon, Button, Modal } from 'react-bootstrap'

export class CodegpModal extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      showing: false,
    };
  }

  renderInitiator() {
    if (this.props.spanText && this.props.spanText !== "") {
      return (<span onClick={() => this.setState({ showing: true })}>
          {this.props.spanText}
        </span>)
    }
    if (this.props.buttonText && this.props.buttonText !== "") {
      return (<Button onClick={() => this.setState({ showing: true })}>
          {this.props.buttonText}
        </Button>)
    }

    return (<Glyphicon
      onClick={() => this.setState({ showing: true })}
      glyph={this.props.glyphText} />);
  }

  renderTitle() {
    if (!this.props.title || this.props.title == "") return null
    return (<Modal.Header closeButton>
      <Modal.Title>{this.props.title}</Modal.Title>
    </Modal.Header>)
  }

  renderBody() {
    if (!this.props.modalBody) return null
    return (<Modal.Body>
      {this.props.modalBody}
    </Modal.Body>)
  }

  renderFooter() {
    if (!this.props.modalFooter) return null
    return (<Modal.Footer>
      {this.props.modalFooter}
    </Modal.Footer>)
  }

  render () {
    return (<span>
      {this.renderInitiator()}
      <Modal
        show={this.state.showing}
        onHide={() => this.setState({ showing: false })}>
          {this.renderTitle()}
          {this.renderBody()}
          {this.renderFooter()}
      </Modal>
    </span>);
  }
}
