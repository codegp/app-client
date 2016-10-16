import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AceEditor from 'react-ace';
import brace from 'brace';

// O GOD WHY
import 'brace/mode/java';
import 'brace/mode/golang';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';


export class Editor extends React.Component {
  componentWillReceiveProps(newProps) {
    return this.props.currentProject.selectedFile !== newProps.currentProject.selectedFile
  }

  setFileData(content) {
    let newValue = {}
    newValue[this.props.currentProject.selectedFile] = content
    this.props.setFileData(newValue)
  }

  render () {
    if (this.props.currentProject.selectedFile === "") return <div/>
    return (<AceEditor
      key={this.props.currentProject.selectedFile + "-editor"}
      mode="golang"
      theme="github"
      value={ this.props.currentProject.fileData[this.props.currentProject.selectedFile] }
      width="100%"
      onChange={(newValue) => this.setFileData(newValue)}
      editorProps={{$blockScrolling: "Infinity"}}
    />)
  }
}
