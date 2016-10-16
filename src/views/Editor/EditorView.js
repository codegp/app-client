import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor } from './Editor'
import { OpenFileModal } from './OpenFileModal'
import { AddFileModal } from './AddFileModal'
import { IDToModel } from '../../utils/utils'
import { replace } from 'react-router-redux'
import { GameStarter } from '../../components/GameStarter'
import { actions as projectActions } from '../../redux/modules/projects'
import { actions as currentProjectActions } from '../../redux/modules/currentProject'
import { actions as gamesActions } from '../../redux/modules/games'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import styles from './EditorView.scss'
import { sprintf } from 'sprintf-js'
import { STORAGE_URL } from '../../utils/constants'

const mapStateToProps = (state) => ({
  projects: state.projects,
  currentProject: state.currentProject,
  gametypes: state.gametypes,
})

const mapDispatchToProps = (dispatch) => ({
  setNewProject: bindActionCreators(currentProjectActions.setNewProject, dispatch),
  createFileData: bindActionCreators(currentProjectActions.createFileData, dispatch),
  getFileData: bindActionCreators(currentProjectActions.getFileData, dispatch),
  setSelectedFile: bindActionCreators(currentProjectActions.setSelectedFile, dispatch),
  saveFileData: bindActionCreators(currentProjectActions.saveFileData, dispatch),
  setFileData: bindActionCreators(currentProjectActions.setFileData, dispatch),
  replace: bindActionCreators(replace, dispatch),
  startGame: bindActionCreators(projectActions.startGame, dispatch),
  createGameForProject: bindActionCreators(gamesActions.createGameForProject, dispatch),
})

export class EditorView extends React.Component {
  project = () => IDToModel(this.props.params.projectID, this.props.projects)

  componentDidMount() {
    if (this.props.currentProject.ID != this.props.params.projectID) {
      this.props.setNewProject(this.props.params.projectID)
    }
  }

  render () {
    let project = this.project()
    if (!project) return <div key="loading-editor"/>
    return (<div
        key={this.props.params.projectID}
        className={styles["editor-container"]}>
      <OptionsBar
        saveFileData={this.props.saveFileData}
        getFileData={this.props.getFileData}
        createFileData={this.props.createFileData}
        currentProject={this.props.currentProject}
        startGame={this.props.startGame}
        project={project}
        createGameForProject={this.props.createGameForProject}
        gametypes={this.props.gametypes}/>
      <FileNav
        setSelectedFile={this.props.setSelectedFile}
        currentProject={this.props.currentProject}/>
      <Editor
        setFileData={this.props.setFileData}
        currentProject={this.props.currentProject} />
    </div>)
  }
}

class OptionsBar extends React.Component {

  getUnopenedFiles () {
    if (!this.props.project.fileNames) return []
    return this.props.project.fileNames.filter( name => {
      return !this.props.currentProject.fileData[name]
    })
  }

  renderHeader() {
    return (<Navbar.Header>
        <Navbar.Brand>
          {this.props.project.name}
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>)
  }

  renderOpenFile() {
    return (<NavItem>
        <OpenFileModal
          getFileData={this.props.getFileData}
          project={this.props.project}
          unopenedFiles={this.getUnopenedFiles()}/>
      </NavItem>)
  }

  renderAddFile() {
    return (<NavItem eventKey={"new"} >
        <AddFileModal
          createFileData={this.props.createFileData}
          project={this.props.project}/>
      </NavItem>)
  }

  renderRecentFiles() {
    return (<NavDropdown eventKey={"recentfiles"} title="Recent Files" id="basic-nav-dropdown">
        {this.getUnopenedFiles().slice(0, 10).map( fileName => (
          <MenuItem
            onClick={() => this.props.getFileData(this.props.project.ID, fileName)}
            key={fileName}
            eventKey={fileName}>{fileName}</MenuItem>))}
      </NavDropdown>)
  }

  renderDocs(gametype) {
    let docs = ['api', 'ids']
    return (<NavDropdown title="Docs" id="basic-nav-dropdown">
        {docs.map( doc => (
          <MenuItem
            onClick={() => window.open(`${STORAGE_URL}/docs-${doc}-${gametype.ID}.html`, '_blank')}
            key={doc}
            eventKey={doc}>{doc}</MenuItem>))}
      </NavDropdown>)
  }

  render () {
    let gametype = IDToModel(this.props.project.gameTypeID, this.props.gametypes)
    return (<Navbar>
      {this.renderHeader()}
      <Navbar.Collapse>
        <Nav>
          {this.renderOpenFile()}
          {this.renderAddFile()}
          {this.renderRecentFiles()}
          {this.renderDocs(gametype)}
          <NavItem>
            <GameStarter
              createGameForProject={this.props.createGameForProject}
              projectID={this.props.project.ID}
              gametype={gametype}/>
          </NavItem>
          <NavItem
            onClick={() => this.props.saveFileData(this.props.project.ID, this.props.currentProject)}>Save</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>);
  }
}

class FileNav extends React.Component {
  getFileData = () => Object.keys(this.props.currentProject.fileData)

  setSelectedFile (eventKey) {
    let fileData = this.getFileData()
    for (var i in fileData) {
      if (fileData[i] == eventKey) {
        this.props.setSelectedFile(fileData[i])
      }
    }
  }

  render () {
    let fileData = this.getFileData()
    if (fileData.length == 0) return <div/>
    return (<Nav
      bsStyle="tabs"
      activeKey={this.props.currentProject.selectedFile == "" ? 0 : this.props.currentProject.selectedFile}
      onSelect={(eventKey) => this.props.setSelectedFile(eventKey)}>
        {fileData.map(file => <NavItem key={file} eventKey={file}>{file}</NavItem>)}
    </Nav>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorView)
