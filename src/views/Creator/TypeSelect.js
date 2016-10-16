import { Glyphicon, Panel, Thumbnail, Label } from 'react-bootstrap'
import { TypeCard } from '../../components/TypeCard'
import { constants } from '../../utils/constants'
import { sprintf } from 'sprintf-js'
export class TypeSelect extends React.Component {

  nonSelectedTypes () {
    var notSelected = []
    var key, type
    for (var t in this.props.types) {
      type = this.props.types[t]
      key = type.ID
      if (this.props.selectedTypes.indexOf(key) === -1) {
        notSelected.push(type)
      }
    }

    return notSelected
  }

  selectedTypes () {
    var notSelected = []
    var key, type
    for (var t in this.props.types) {
      type = this.props.types[t]
      key = type.ID
      if (this.props.selectedTypes.indexOf(key) !== -1) {
        notSelected.push(type)
      }
    }

    return notSelected
  }

  addType (typeID) {
    var index = this.props.selectedTypes.indexOf(typeID)
    if (index != -1) {
      console.log("ERROR found type in selected types list")
      return
    }
    this.props.onChange(this.props.label, this.props.selectedTypes.concat(typeID))
  }

  removeType (typeID) {
    var index = this.props.selectedTypes.indexOf(typeID)
    if (index == -1) {
      console.log("ERROR could not find type in selected types list")
      return
    }
    var newValue = this.props.selectedTypes
    newValue.splice(index, 1)
    this.props.onChange(this.props.label, newValue)
  }

  render () {
    return (<div>
      <label>{this.props.label}</label>
      <Panel>
        <label>{"select type"}</label>
        <div>
          {this.nonSelectedTypes().map(type => <TypeInfo
            toAdd={true}
            onSelect={() => this.addType(type.ID)}
            type={type}
            key={type.ID} />)}
        </div>
        <br/>
        <label>{"selected types"}</label>
        <div>
          {this.selectedTypes().map(type => <TypeInfo
            toAdd={false}
            onSelect={() => this.removeType(type.ID)}
            type={type}
            key={type.ID} />)}
        </div>
      </Panel>
    </div>)
  }
}

export class TypeInfo extends React.Component {
  //TODO: padding rather than span
  render () {
    return (<Label>
      <TypeCard type={this.props.type}/>
      <span>{"  "}</span>
      <Glyphicon
        onClick={() => this.props.onSelect()}
        glyph={this.props.toAdd ? 'plus' : 'remove'} />
    </Label>)
  }
}
