import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { Well, Navbar, Nav, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { actions as resizeActions } from '../redux/modules/resize'
import { actions as userActions } from '../redux/modules/user'
import { actions as gameTypesActions } from '../redux/modules/gametypes'
import { actions as projectsActions } from '../redux/modules/projects'
import { actions as typesActions } from '../redux/modules/types'
require('./CoreLayout.scss')
import React, { Component } from 'react';

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  fetchTypes: bindActionCreators(typesActions.fetchTypes, dispatch),
	replace: bindActionCreators(replace, dispatch),
  setSize: bindActionCreators(resizeActions.setSize, dispatch),
  getAndSetUser: bindActionCreators(userActions.getAndSetUser, dispatch),
  fetchGameTypes: bindActionCreators(gameTypesActions.fetchGameTypes, dispatch),
  fetchProjects: bindActionCreators(projectsActions.fetchProjects, dispatch),
})


export class CoreLayout extends Component {
	constructor(props, context) {
    super(props, context)
    props.getAndSetUser()
    props.fetchGameTypes()
    props.fetchProjects()
    props.fetchTypes()

    window.addEventListener('resize', this.props.setSize)
	}

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.setSize)
  }

  render () {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand onClick={() => this.props.replace("/")}>
              {"Codegp"}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav
              onSelect={(e, eventKey) => this.props.replace('/creator/gameType')}>
              <NavItem>{"Creator"}</NavItem>
            </Nav>
            <Nav
              onSelect={(e, eventKey) => this.props.replace('/mapbuilder')}>
              <NavItem>{"Map Builder"}</NavItem>
            </Nav>
            <Nav
              onSelect={(e, eventKey) => this.props.replace('/gametypes')}>
              <NavItem>{"Game Types"}</NavItem>
            </Nav>
            <Nav
              pullRight
              onSelect={(e, eventKey) => this.props.replace('/projects')}>
              <NavItem>My Projects</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='content-container'>
          {this.props.children}
        </div>
      </div>
    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
