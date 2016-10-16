import { createAction, handleActions } from 'redux-actions'
import { actions as gameTypeActions } from './gametypes'
import { replace } from 'react-router-redux'
import { sprintf } from 'sprintf-js'
import { gameTypeDefinitionBoilerplate } from '../../utils/gameTypeDefinitionBoilerplate'

var request = require('axios');

export const DEFAULT_STATE = {
	botTypes: [],
	itemTypes: [],
	terrainTypes: [],
	apiFuncs: [],
	code: gameTypeDefinitionBoilerplate,
	name: "",
	numTeams: 1,
	loading: false,
}

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_TYPE_GT = 'UPDATE_TYPE_GT'
const UPDATE_API_FUNC = 'UPDATE_API_FUNC'
const SET_CODE = 'SET_CODE'
const SET_NAME = 'SET_NAME'
const SET_NUM_TEAMS = 'SET_NUM_TEAMS'

// ------------------------------------
// Actions
// ------------------------------------
const updateTypeGT = createAction(UPDATE_TYPE_GT)
const updateAPIFuncs = createAction(UPDATE_API_FUNC)
const setCode = createAction(SET_CODE)
const setName = createAction(SET_NAME)
const setNumTeams = createAction(SET_NUM_TEAMS)

export const actions = {
	updateTypeGT,
  updateAPIFuncs,
  setCode,
	submitGameType,
	setName,
	setNumTeams,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	UPDATE_TYPE_GT: _updateTypeGT,
	UPDATE_API_FUNC: _updateApiFunc,
	SET_CODE: (state, action) => Object.assign({}, state, {code: action.payload}),
	SET_NAME: (state, action) => Object.assign({}, state, {name: action.payload}),
	SET_NUM_TEAMS: (state, action) => Object.assign({}, state, {num_teams: action.payload}),
}, DEFAULT_STATE)

function _updateTypeGT (state, action) {
	var newType = {}
  newType[action.payload.type] = action.payload.info
  return Object.assign({}, state, newType)
}

function _updateApiFunc(state, action) {
	var newApiFuncs = state.apiFuncs
	var index = state.apiFuncs.indexOf(action.payload)
	if (index === -1) {
		newApiFuncs = newApiFuncs.concat(action.payload)
	} else {
		newApiFuncs.splice(index, 1)
	}

	return Object.assign({}, state, {apiFuncs: newApiFuncs})
}

// ------------------------------------
// Async action dispatchers
// ------------------------------------

export function submitGameType (game, userID) {
	var url = "/console/gametype"
	var code = game.code
	var data = _getPostData(game)
	return (dispatch, getState) => {
		request.post(url, data)
			.then( resp => _handleGameTypeSubmitSuccess(dispatch, resp, code))
			.catch( err => console.log(err))
	}
}

function _handleGameTypeSubmitSuccess(dispatch, resp, code) {
	_submitCode(resp.data.ID, code)
		.then( () => _dispatchNewGameType(dispatch, resp.data))
		.catch( err => console.log(err))
}

function _getPostData(game) {
	var postData = Object.assign({}, game)
	// server doesn't care about loading and icon is sent
	// after the entity is created
	delete postData["code"]
	delete postData["loading"]
	return postData
}

function _dispatchNewGameType(dispatch, data) {
	var newPath = `/gametype/${data.ID}`
	dispatch(gameTypeActions.addGameType(data))
	// TODO: clear this store
	dispatch(push(newPath))
}

function _submitCode(id, code) {
	console.log(code)
	var codeUrl = `/console/gametype/${id}/code`
	var data = new FormData();
	var blob = new Blob([code], {type: 'text/plain'})
	data.append("code", blob)
	return request.post(codeUrl, data)
}
