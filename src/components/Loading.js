import { ProgressBar } from 'react-bootstrap'

export class Loading extends React.Component {
  render () {
    return (<div
      className='loading'>
      <h4>{`Loading your ${this.props.contentType}`}</h4>
       <ProgressBar striped bsStyle="info" now={100} />
    </div>)
  }
}
