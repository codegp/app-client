import { Accordion, Panel, Button, Input } from 'react-bootstrap';
import { constants } from '../../utils/constants'
import { TypeSelect } from './TypeSelect'
import { sprintf } from 'sprintf-js'

import AceEditor from 'react-ace';
import brace from 'brace';

// O GOD WHY
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_light';



export class GameTypeCreator extends React.Component {
  onTypeChange(type, info) {
    this.props.updateTypeGT({type: type, info: info})
  }

  render () {
    return (<Accordion>
        <Panel
          eventKey="1"
          header="Step 1: Select the types of bots, items, and terrain available in your world">
          {constants.GAME_TYPE_TYPES.map( type => <TypeSelect
            key={type}
            label={type}
            types={this.props.types[type]}
            selectedTypes={this.props.creator[type]}
            onChange={(key, val) => this.onTypeChange(key, val)} /> )}
        </Panel>
        <Panel
          eventKey="2"
          header="Step 2: Define the api available to the users">
          {constants.API_FUNCS.map( apiFunc => <Input
            type='checkbox'
            label={apiFunc}
            key={apiFunc}
            checked={this.props.creator.apiFuncs.indexOf(apiFunc) != -1}
            onChange={() => this.props.updateAPIFuncs(apiFunc) } />) }
        </Panel>
        <Panel
          eventKey="3"
          header="Step 3: Satisfy the GameType interface in the editor below">
          <AceEditor
            key={"gt-editor"}
            mode="java"
            theme="github"
            value={this.props.creator.code}
            width="100%"
            onChange={(newValue) => this.props.setCode(newValue)}
            editorProps={{$blockScrolling: "Infinity"}}/>
        </Panel>
        <Panel
          eventKey="4"
          header="Step 4: Miscellaneous Options">
            <Input
              type='number'
              label="num teams"
              key="gt-num-teams"
              value={this.props.creator.num_teams}
              onChange={(e) => this.props.setNumTeams(e.target.value) } />
            <Input
              type='text'
              label="name"
              key="gt-name"
              value={this.props.creator.name}
              onChange={(e) => this.props.setName(e.target.value) } />
        </Panel>
        <Panel
          eventKey="5"
          header="Step 5: Review and Submit">
          <pre>{JSON.stringify(this.props.creator, (key, value) => key == 'code' ? undefined : value, 4)}</pre>
          <pre>{this.props.creator.code}</pre>
          <Button onClick={() => this.props.submitGameType(this.props.creator, this.props.user.ID)}>Submit</Button>
        </Panel>
      </Accordion>)
  }
}
