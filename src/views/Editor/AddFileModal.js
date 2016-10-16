import { Input, Glyphicon, Button, Modal, } from 'react-bootstrap';
import styles from './EditorView.scss'

export class AddFileModal extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      showing: false,
    };
  }

  createFile () {
    let name = this.refs.input.getValue()
    this.props.createFileData(this.props.project.ID, name)
    this.setState({ showing: false })
  }

  render () {
    return (<div>
      <Glyphicon
        onClick={() => this.setState({ showing: true })}
        glyph="plus" />
      <Modal
        show={this.state.showing}
        onHide={() => this.setState({ showing: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Add File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              type='text'
              ref='input'/>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ showing: false })}>
              Close
            </Button>
            <Button
              bsStyle="primary"
              onClick={() => this.createFile()}>
              Create
            </Button>
          </Modal.Footer>
      </Modal>
    </div>);
  }
}
