import { Glyphicon, Input, Panel, Button } from 'react-bootstrap';
import { constants } from '../../utils/constants'
import { IDToModel } from '../../utils/utils'
import { sprintf } from 'sprintf-js'

export class TypeToFloat extends React.Component {

  nonSelectedTypes () {
    var notSelected = []
    var key, type
    for (var t in this.props.types) {
      type = this.props.types[t]
      key = type.ID
      if (this.props.dict[key] === undefined) {
        notSelected.push(type)
      }
    }

    return notSelected
  }

  onChange(val) {
    this.props.onChange(this.props.label, val)
  }

  addMap (typeID) {
    var type = this.props.types[typeID]
    if (this.props.dict[typeID]) {
      console.log("ERROR found added type in selected types dict")
      return
    }
    var newValue = Object.assign({}, this.props.dict)
    newValue[typeID] = 0
    this.props.onChange(newValue)
  }

  removeMap (typeID) {
    if (this.props.dict[typeID] === undefined) {
      console.log("ERROR could not find removed type in selected types dict")
      return
    }
    var newValue = Object.assign({}, this.props.dict)
    delete newValue[typeID]
    this.props.onChange(newValue)
  }

  updateMap (key, newFactor) {
    if (this.props.dict[key] === undefined) {
      console.log("ERROR could not find updated type in selected types dict")
      return
    }
    var newValue = Object.assign({}, this.props.dict)
    newValue[key] = newFactor
    this.props.onChange(newValue)
  }

  render () {
    var dictKeys = Object.keys(this.props.dict)
    var nonSelected = this.nonSelectedTypes()
    return (<div>
        <label>{this.props.label}</label>
          <Panel>
            <Input
              type='select'
              label="new map"
              key={sprintf('select-%s-%s', this.props.label, nonSelected.length) }
              defaultValue={'select'}
              onChange={(e) => this.addMap(e.target.value)}>
                <option value='select' key='select'>select</option>
                {nonSelected.map(type => <option
                  value={type.ID}
                  key={type.ID}>{type.name}</option>)}
            </Input>
            <label>{"selected types"}</label>
            <br/>
            {dictKeys.map(k => <TypeToFloatUpdater
              remove={() => this.removeMap(k)}
              onChange={(newFactor) => this.updateMap(k, newFactor)}
              factor={this.props.dict[k]}
              typeName={IDToModel(k, this.props.types).name}
              dictKey={k}
              key={k} />)}
        </Panel>
      </div>)
  }
}

export class TypeToFloatUpdater extends React.Component {
  renderRemove () {
    return (<Button onClick={() => this.props.remove()}>
      <Glyphicon glyph="remove" />
    </Button>)
  }

  render () {
    return (<div>
      <Input
        type="number"
        step="0.001"
        key={"updater-" + this.props.dictKey}
        label={this.props.typeName}
        value={this.props.factor}
        buttonAfter={this.renderRemove()}
        onChange={(e) => this.props.onChange(e.target.value)}/>
    </div>)
  }
}
