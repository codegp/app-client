import { createAction, handleActions } from 'redux-actions'
import { replace } from 'react-router-redux'
import { CreateUrl } from '../../utils/utils'
var request = require('axios');

// ------------------------------------
// Async action dispatchers
// ------------------------------------
export function fetchProjects () {
	let url = CreateUrl("projects/")

	return (dispatch, getState) => {
		request.get(url)
			.then( resp => dispatch(setProjects(resp.data)))
			.catch(err => console.log(err))
	}
}

export function createProject (gameTypeID, name, language) {
	let url = CreateUrl("project")
	let postData = {
		name: name,
		language: language,
		gameTypeID: gameTypeID,
	}

	return (dispatch, getState) => {
		request.post(url, postData)
			.then( resp => dispatch(addProject(resp.data)))
			.catch( err => console.log(err))
	}
}

export function startGame (project) {
	let url = CreateUrl("game")
	let data = {
		projectID: project.ID,
	}

	return (dispatch, getState) => {
		request.post(url, data)
			.then( resp => {
				dispatch(addGameToProject({projectID: project.ID, game_key: resp.data.ID}))
				dispatch(push(sprintf("/viewer/%s", resp.data.ID)))
			})
			.catch( err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_PROJECTS = 'SET_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'
const ADD_FILE_TO_PROJECT = 'ADD_FILE_TO_PROJECT'
const ADD_GAME_TO_PROJECT = 'ADD_GAME_TO_PROJECT'

// ------------------------------------
// Actions
// ------------------------------------
const setProjects = createAction(SET_PROJECTS)
const addProject = createAction(ADD_PROJECT)
const addFileToProject = createAction(ADD_FILE_TO_PROJECT)
const addGameToProject = createAction(ADD_GAME_TO_PROJECT)

export const actions = {
	fetchProjects,
	createProject,
	addFileToProject,
	startGame,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	ADD_FILE_TO_PROJECT: _addFileToProject,
  SET_PROJECTS: (state, action) => action.payload,
	ADD_PROJECT: _addProject,
	ADD_GAME_TO_PROJECT: _addGameToProject,
}, [])

function _addProject(state, actions) {
	state.push(actions.payload)
	return state.slice(0)
}

function _addFileToProject(state, action) {
	for (var i in state) {
		if (state[i].ID == action.payload.projectKey) {
			state[i].fileNames.push(action.payload.fileName)
		}
	}
	return state.slice(0)
}

function _addGameToProject(state, action) {
	for (var i in state) {
		if (state[i].ID == action.payload.projectID) {
			state[i].game_keys.push(action.payload.game_key)
		}
	}
	return state.slice(0)
}
