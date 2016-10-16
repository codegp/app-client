import { Input, Panel, Button } from 'react-bootstrap';
import { constants } from '../../utils/constants'
import { COMPONENT_TYPES } from '../../utils/attributToComponentMaps'
import { TypeToFloat } from './TypeToFloat'
import { TypeSelect } from './TypeSelect'
import { IconUploader } from './IconUploader'
import { sprintf } from 'sprintf-js'

export class TypeCreator extends React.Component {

  onChange(key, val) {
    var newValue = {}
    newValue[key] = val
    var info = Object.assign(this.props.creator, newValue)
    this.props.updateType({type: this.props.creatorType, key: key, val: val})
  }

  getTypeIndex(key) {
    if (key.startsWith("attack")) return constants.ATTACK_TYPES
    if (key.startsWith("move")) return constants.MOVE_TYPES
    if (key.startsWith("item")) return constants.ITEM_TYPES
    if (key.startsWith("terrain")) return constants.TERRAIN_TYPES
    if (key.startsWith("bot")) return constants.BOT_TYPES
    console.log("INVALID KEY")
  }

  renderInput(key) {
    var value = this.props.creator[key]

    // special case for loading.
    // this is whole loading thing is a hack and should be reworked
    if (key === 'loading') {
      return (<Button
        key={`loading-${value}-${this.props.creatorType}`}
        disabled={value}
        onClick={() => this.props.submitType({type: this.props.creatorType, creator: this.props.creator})}>
          Submit
      </Button>)
    }

    var componentType = this.props.component_map[key]
    switch(componentType) {
      case COMPONENT_TYPES.TEXT:
        return <Input
          type="text"
          label={key}
          key={key + this.props.creatorType}
          value={this.props.creator[key]}
          onChange={(e) => this.onChange(key, e.target.value)}/>
      case COMPONENT_TYPES.TYPE_SELECT:
        var typeIndex = this.getTypeIndex(key)
        if (!typeIndex) return <div/>
        return <TypeSelect
          key={key + this.props.creatorType}
          label={key}
          types={this.props.types[typeIndex]}
          selectedTypes={this.props.creator[key]}
          onChange={(key, val) => this.onChange(key, val)} />
      case COMPONENT_TYPES.INT:
        return <Input
          type="number"
          label={key}
          key={key + this.props.creatorType}
          value={this.props.creator[key]}
          onChange={(e) => this.onChange(key, Number(e.target.value))}/>
      case COMPONENT_TYPES.FLOAT:
        return <Input
          type="number"
          step="0.001"
          label={key}
          key={key + this.props.creatorType}
          value={this.props.creator[key]}
          onChange={(e) => this.onChange(key, Number(e.target.value))}/>
      case COMPONENT_TYPES.BOOL:
        return <Input
          type="checkbox"
          label={key}
          key={key + this.props.creatorType}
          checked={this.props.creator[key]}
          onChange={(e) => this.onChange(key, e.target.checked)} />
      case COMPONENT_TYPES.FILE_UPLOAD:
        return <IconUploader
          key={key + this.props.creatorType}
          iconData={this.props.creator[key]}
          onChange={(value) => this.onChange(key, value)} />
      default:
        console.log("NO COMPONENT EXISTS FOR KEY:", key)
        return <div key={key}/>
    }
  }

  render() {
    return (<Panel key={`creator-${this.props.creatorType}`}>
      {Object.keys(this.props.creator).map( key => this.renderInput(key) )}
    </Panel>)
  }
}
