import { createAction, handleActions } from 'redux-actions'
var request = require('axios');
import { CreateUrl } from '../../utils/utils'
import { actions as projectsActions } from './projects'

// ------------------------------------
// Async action dispatchers
// ------------------------------------
export function getFileData (projectID, fileName) {
	let url = CreateUrl(`project/${projectID}/file/${fileName}`)
	return (dispatch, getState) => {
		request.get(url)
			.then( resp => {
				let fileContent = {}
				fileContent[fileName] = resp.data
				dispatch(addFileData(fileContent))
				dispatch(setSelectedFile(fileName))
			})
			.catch(err => console.log(err))
	}
}

export function createFileData (projectID, fileName) {
	let url = CreateUrl(`project/${projectID}/file/${fileName}`)
	return (dispatch, getState) => {
		request.post(url)
			.then( resp => {
				let fileContent = {}
				fileContent[fileName] = resp.data
				dispatch(projectsActions.addFileToProject({projectID: projectID, fileName: fileName}))
				dispatch(addFileData(fileContent))
			 	dispatch(setSelectedFile(fileName))
			})
			.catch(err => console.log(err))
	}
}

export function deleteFileData (projectID, fileName) {
	let url = CreateUrl(`project/${projectID}/file/${fileName}`)
	return (dispatch, getState) => {
    dispatch(removeFileData(fileName))
		request.delete(url)
			.then( resp => console.log("Deleted file successfully,", resp))
			.catch(err => console.log(err))
	}
}

export function saveFileData (projectID, currentProject) {
	let url = CreateUrl(`project/${projectID}/file/${currentProject.selectedFile}`)
	let content = currentProject.fileData[currentProject.selectedFile]
	return (dispatch, getState) => {
		request.put(url, content)
			.then( resp => console.log("Saved file successfully,", resp))
			.catch(err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_NEW_PROJECT = 'SET_NEW_PROJECT'
const ADD_FILE_DATA = 'ADD_FILE_DATA'
const REMOVE_FILE_DATA = 'REMOVE_FILE_DATA'
const DELETE_FILE_DATA = 'DELETE_FILE_DATA'
const SET_SELECTED_FILE = 'SET_SELECTED_FILE'
const SET_FILE_DATA = 'SET_FILE_DATA'


// ------------------------------------
// Actions
// ------------------------------------
const setNewProject = createAction(SET_NEW_PROJECT)
const addFileData = createAction(ADD_FILE_DATA)
const removeFileData = createAction(REMOVE_FILE_DATA)
const setSelectedFile = createAction(SET_SELECTED_FILE)
const setFileData = createAction(SET_FILE_DATA)

export const actions = {
	getFileData,
	createFileData,
  deleteFileData,
  setNewProject,
  addFileData,
  removeFileData,
	setSelectedFile,
	saveFileData,
	setFileData,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_SELECTED_FILE: (state, action) => Object.assign({}, state, {selectedFile: action.payload}),
  SET_NEW_PROJECT: (state, action) => Object.assign({}, {selectedFile: "", project: action.payload, fileData: {}}),
  ADD_FILE_DATA: (state, action) => Object.assign({}, state, {fileData: Object.assign(state.fileData, action.payload)}),
  REMOVE_FILE_DATA: (state, action) => Object.assign({}, state, {fileData: state.fileData.splice(state.fileDate.indexOf(action.payload), 1)}),
	SET_FILE_DATA: (state, action) => Object.assign({}, state, {fileData: Object.assign(state.fileData, action.payload)}),
}, {selectedFile: "", project: "", fileData: {}}) // TODO: remove project and selected file and use url params

function _setFileData(state, action) {
	for (var i in state.fileData) {
		if (state.fileData[i].name == action.payload.name) {
			state.fileData[i].content = action.payload.value
		}
	}
	return Object.assign({}, state)
}
