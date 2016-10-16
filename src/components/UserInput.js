import { Input, Button, Glyphicon, FormControl, FormGroup } from 'react-bootstrap'
var request = require('axios');

const validationStates = {
  VALID = 'success',
  INVALID = 'error',
  VERIFYING = 'warning',
}

export class UserInput React.Component {
  constructor(props) {
    super(props)
    this.state = {
      validationTimerID: null,
      currentValidationStartData: null,
      validationState: validationState.INVALID,
      user: null,
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.user !== nextState.user) {
      this.props.onUserChange(user)
    }
  }

  onTextChange () {
    // invalidate previous timeout if it has not triggered
    if (state.validationTimerID !== null) {
      clearTimeout(state.validationTimerID)
    }

    currentValidationStartData = Date.now()
    validationTimerID = setTimeout(() => this.requestText(currentValidationStartData), 250)

    this.setState({
      validationState: validationStates.VERIFYING,
      currentValidationStartData: currentValidationStartData,
      validationTimerID: validationTimerID,
      user: null,
    })
  }

  requestText(requestValidationStartData) {
    request.get(`/gameconsole/search/user/name/${this.ref.usernameInput}`)
      .then((resp)  => this.onResponse(requestValidationStartData, resp.exists, resp.user))
      .catch((err) => this.onResponse(requestValidationStartData, false, null))
  }

  onResponse(requestValidationStartData, exists, user) {
    if (this.state.currentValidationStartData === requestValidationStartData) {
      this.setState({
        user: user,
        validationState: exists ? validationStates.VALID : validationStates.INVALID,
        currentValidationStartData: null,
        validationTimerID: null,
      })
    }
  }

  renderFeedback() {
    if (this.state.validationState === validationStates.VALID
      || this.state.validationState === validationStates.INVALID) {
        return (<FormControl.Feedback />)
    }

    return (<FormControl.Feedback>
        <Glyphicon glyph="refresh" />
      </FormControl.Feedback>)
  }

  render() {
    return (<FormGroup validationState={this.state.validationState}>
      <ControlLabel>Search user</ControlLabel>
      <FormControl type="text" />
        {this.renderFeedback()}
    </FormGroup>)
  }
}
