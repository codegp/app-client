import { Glyphicon, Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from './EditorView.scss'

export class OpenFileModal extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      showing: false,
    };
  }

  renderListItems () {
    if (this.props.unopenedFiles.length < 1) return (<p>No Files Exist!</p>)
    return this.props.unopenedFiles.map( file => {
      return (<ListGroupItem
        onClick={() => this.props.getFileData(this.props.project.ID, file)}
        key={file}>
          {file}
      </ListGroupItem>)
    })
  }

  render () {
    return (<div>
      <Glyphicon
        onClick={() => this.setState({ showing: true })}
        className={this.props.unopenedFiles.length > 0 ? styles['file-modal-enabled'] : styles['file-modal-disabled']}
        glyph="folder-open" />
      <Modal
        show={this.state.showing}
        onHide={() => this.setState({ showing: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Open File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListGroup>
            {this.renderListItems()}
          </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ showing: false })}>
              Close
            </Button>
          </Modal.Footer>
      </Modal>
    </div>);
  }
}
