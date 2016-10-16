import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import styles from './Splash.scss'

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
	replace: bindActionCreators(replace, dispatch),
})

export class Splash extends React.Component {
  renderButton() {
    if (!this.props.user || !this.props.user.ID) {
      return (
        <Button
          onClick={() => window.location = "/login"}
          bsStyle="info">
            Login
        </Button>
      )
    }

    return (
      <Button
        onClick={() => this.props.replace('/projects')}
        bsStyle="info">
          Continue
      </Button>
    )
  }
  render() {
    return (
      <div className={'splash-header'}>
          <div className={'splash-content'}>
          <h1>Welcome!</h1>
          {this.renderButton()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
