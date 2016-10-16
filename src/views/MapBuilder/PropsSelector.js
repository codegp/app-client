import { Input, Nav, NavItem, Button } from 'react-bootstrap'
import { LOCATION_INFO_IDS } from '../../utils/constants'
import { TypeInfo } from '../Creator/TypeSelect'

export class PropsSelector extends React.Component {
  render () {
    console.log(Object.keys(LOCATION_INFO_IDS))

    return (
      <div>
        <Input
          label="Name"
          type="text"
          onChange={(e) => this.props.setName(e.target.value)}/>
        <Input
          label="Width"
          defaultValue={this.props.mapCreator.mapDefinition.length}
          type="number"
          min={1}
          max={1000}
          onChange={(e) => this.props.setX(e.target.value)}/>
        <Input
          label="Height"
          defaultValue={this.props.mapCreator.mapDefinition[0].length}
          type="number"
          min={1}
          max={1000}
          onChange={(e) => this.props.setY(e.target.value)}/>
        <Input
          label="Team"
          help="Any bots added will be added for the selected team"
          type="number"
          min={1}
          defaultValue={1}
          max={this.props.gameType.num_teams}
          onChange={(e) => this.props.setCurrentTeam(e.target.value)}/>
        <Input
          label="Default Terrain"
          help="Any terrain not manually overridden will be of this type"
          type="select"
          onChange={(e) => this.props.setDefaultTerrain(this.props.types.terrainTypes[e.target.value].ID)}>
          {this.props.types.terrainTypes.map((terrainType, i) => <option key={terrainType.ID} value={i}>{terrainType.name}</option>)}
        </Input>
        <Nav
          bsStyle="tabs"
          onSelect={(k) => this.props.setEditingClass({
            editingClass: (k + "Types"),
            editingType: (this.props.types[k + "Types"].length > 0 ? this.props.types[k + "Types"][0].ID : "")})}>
          {Object.keys(LOCATION_INFO_IDS).map(k => <NavItem key={LOCATION_INFO_IDS[k]} eventKey={LOCATION_INFO_IDS[k]}>{LOCATION_INFO_IDS[k]}</NavItem>)}
        </Nav>
        <Input
          type="select"
          onChange={(e) => this.props.setEditingType(e.target.value)}>
          {this.props.types[this.props.mapCreator.editingClass].map(type => <option key={type.ID} value={type.ID}>{type.name}</option>)}
        </Input>
        <Button
          onClick={(e) => this.props.submitMap(this.props.gameType.ID, this.props.mapCreator.name)}
          bsStyle="primary">
          Submit
        </Button>
      </div>
    )
  }
}
