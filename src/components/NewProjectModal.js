import { Glyphicon, Button, Modal, Input } from 'react-bootstrap';
import { CodegpModal } from './CodegpModal'
import { LANGUAGES } from '../utils/constants'

export class NewProjectModal extends React.Component {
  onSubmit(e) {
    let language = this.refs.langselect.getValue()
    let name = this.refs.nameinput.getValue()

    // if the game type was not provided a select is rendered
    // so get the selection from there
    let gameType = this.props.gameType
    if (!gameType) {
      gameType = Number(this.refs.gtselect.getValue())
    }

    this.props.createProject(gameType, name, language)
  }

  renderGameTypesInput() {
    return (<Input
      ref="gtselect"
      type="select"
      label="Choose Game Type">
      {this.renderGameTypesOptions()}
    </Input>)
  }

  renderGameTypesOptions() {
    return this.props.gameTypes.map(gameType => (
      <option
        value={gameType.ID}
        key={gameType.ID}>{gameType.name}</option>
    ))
  }

  renderLanguageOptions() {
    return LANGUAGES.map(language => (
      <option
        value={language}
        key={language}>{language}</option>
    ))
  }

  renderBody () {
    // if the game type was not provided a render a select
    let gameTypeSelect = null
    if (!this.props.gameType) {
      gameTypeSelect = this.renderGameTypesInput()
    }

    return (<div>
        {gameTypeSelect}
        <Input
          ref="langselect"
          type="select"
          label="Choose Language">
          {this.renderLanguageOptions()}
        </Input>
        <Input
          ref="nameinput"
          type="text"
          label="Project Name" />
      </div>
    )
  }

  renderFooter () {
    return (<Button onClick={(e) => this.onSubmit(e)}>Start New Project</Button>)
  }

  render () {
    return (<CodegpModal
      title="Create Project"
      glyphText="plus"
      modalBody={this.renderBody()}
      modalFooter={this.renderFooter()} />)
  }
}
