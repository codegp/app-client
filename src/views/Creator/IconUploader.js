import { Input } from 'react-bootstrap';
import { constants } from '../../utils/constants'
import { sprintf } from 'sprintf-js'

export class IconUploader extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {preview: null}

    if (props.iconData !== null) {
      this.setPreview(props.iconData)
    }
  }

  componentWillReceiveProps(newProps) {
    var newIconData = newProps.iconData
    if (newIconData === null && this.state.preview !== null) {
      this.setState({preview: null})
    }
  }

  onUpload (input) {
    if (input.files && input.files[0]) {
      // TODO: check if image
      this.props.onChange(input.files[0])
      this.setPreview(input.files[0])
    }
  }

  setPreview(file) {
    var reader = new FileReader();
    reader.onload = (e) => this.setState({preview: reader.result})
    reader.readAsDataURL(file);
  }

  preview () {
    if (this.state.preview != null) {
      return (<img src={this.state.preview} width='100' height='100'/>)
    }
  }

  render () {
    return (<div>
      <Input
        type='file'
        ref='fileUpload'
        label={"Icon"}
        key={this.props.ID}
        help='Square icon work best as the icon will be resized to 100x100 px'
        onChange={(e) => this.onUpload(e.target)} />
        {this.preview()}
    </div>)
  }
}
