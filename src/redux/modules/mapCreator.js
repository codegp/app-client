import { createAction, handleActions } from 'redux-actions'
// import { actions as gameTypeActions } from './gametypes'
import { replace } from 'react-router-redux'
import { CreateUrl } from '../../utils/utils'

import { sprintf } from 'sprintf-js'
import { LOCATION_INFO_IDS } from '../../utils/constants'
import { TypesIDToLocInfoID, LocInfoIDToTypesID } from '../../utils/utils'

var request = require('axios');

export const DEFAULT_STATE = {
	mapDefinition: [[]],
	editingClass: "botTypes",// TODO: remove from store and pass values from refs through action payload?
	editingType: "",// TODO: remove from store and pass values from refs through action payload?
	defaultTerrain: "",// TODO: remove from store and pass values from refs through action payload?
	currentTeam: 1,// TODO: remove from store and pass values from refs through action payload?
	name: "", // TODO: remove from store and pass values from refs through action payload?
}

// ------------------------------------
// Async action dispatchers
// ------------------------------------

export function submitMap (gameType, name) {
	var url = CreateUrl(`gametype/${gameType}/map/${name}`)
	return (dispatch, getState) => {
		request.post(url, getState().mapCreator.mapDefinition)
			.then( resp => {
				// dispatch(gameTypeActions.addMap(resp.data))
				dispatch(push(sprintf("/gametype/%s", gameType)))
			})
			.catch(err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_X = 'SET_X'
const SET_Y = 'SET_Y'
const SET_DEFAULT_TERRAIN = 'SET_DEFAULT_TERRAIN'
const UPDATE_LOC_INFO = 'UPDATE_LOC_INFO'
const SET_EDITING_CLASS = 'SET_EDITING_CLASS'
const SET_EDITING_TYPE = 'SET_EDITING_TYPE'
const SET_CURRENT_TEAM = 'SET_CURRENT_TEAM'
const SET_NAME = 'SET_NAME'

// ------------------------------------
// Actions
// ------------------------------------
const setX = createAction(SET_X)
const setY = createAction(SET_Y)
const setDefaultTerrain = createAction(SET_DEFAULT_TERRAIN)
const updateLocationInfo = createAction(UPDATE_LOC_INFO)
const setEditingType = createAction(SET_EDITING_TYPE)
const setEditingClass = createAction(SET_EDITING_CLASS)
const setCurrentTeam = createAction(SET_CURRENT_TEAM)
const setName = createAction(SET_NAME)

export const actions = {
	setX,
	setY,
	setDefaultTerrain,
	updateLocationInfo,
	setEditingClass,
	setEditingType,
	setCurrentTeam,
	setName,
	submitMap,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_X: _setX,
	SET_Y: _setY,
	SET_DEFAULT_TERRAIN: _setDefaultTerrain,
	UPDATE_LOC_INFO: _updateLocationInfo,
	SET_EDITING_CLASS: (state, action) => Object.assign({}, state, {editingClass: action.payload.editingClass}, {editingType: action.payload.editingType}),
	SET_EDITING_TYPE: (state, action) => Object.assign({}, state, {editingType: action.payload}),
	SET_CURRENT_TEAM: (state, action) => Object.assign({}, state, {currentTeam: action.payload}),
	SET_NAME: (state, action) => Object.assign({}, state, {name: action.payload}),
}, DEFAULT_STATE)

function _setX (state, action) {
	var newLength = action.payload
	var currentLength = state.mapDefinition.length

	if (newLength > currentLength) {
		for (var i = currentLength; i < newLength; i++) {
			state.mapDefinition.push([])
			for (var j = 0; j < state.mapDefinition[0].length; j++) {
				state.mapDefinition[i].push(newLocationInfo(state.defaultTerrain))
			}
		}
	} else if (newLength < currentLength) {
		state.mapDefinition.splice(newLength, currentLength - newLength)
	}
  return Object.assign({}, state)
}

function _setY (state, action) {
	var newLength = action.payload
	var currentLength = state.mapDefinition[0].length

	if (newLength > currentLength) {
		for (var i = 0; i < state.mapDefinition.length; i++) {
			for (var j = currentLength; j < newLength; j++) {
				state.mapDefinition[i].push(newLocationInfo(state.defaultTerrain))
			}
		}
	} else if (newLength < currentLength) {
		for (var i = 0; i < state.mapDefinition.length; i++) {
			state.mapDefinition[i].splice(newLength, currentLength - newLength)
		}
	}

  return Object.assign({}, state)
}

function _setDefaultTerrain (state, action) {
	if (state.mapDefinition[0].length == 0) {
		state.mapDefinition[0].push(newLocationInfo(action.payload))
		return Object.assign({}, state, {defaultTerrain: action.payload})
	}

	for (var i = 0; i < state.mapDefinition.length; i++) {
		for (var j = 0; j < state.mapDefinition[i].length; j++) {
			state.mapDefinition[i][j][LOCATION_INFO_IDS.TERRAIN] = action.payload
		}
	}

	return Object.assign({}, state, {defaultTerrain: action.payload})
}

function _updateLocationInfo (state, action) {
	var locInfoID = TypesIDToLocInfoID(state.editingClass)
	var currentOccupantID = state.mapDefinition[action.payload.x][action.payload.y][locInfoID]
	var newValue = state.editingType

	if (locInfoID === LOCATION_INFO_IDS.BOT) {
		newValue = newBotInfo(state)
	}

	if (currentOccupantID !== "") {
		state.mapDefinition[action.payload.x][action.payload.y][locInfoID] = ""
	} else {
		state.mapDefinition[action.payload.x][action.payload.y][locInfoID] = newValue
	}
	return Object.assign({}, state)
}

// utils

function newLocationInfo(terrainTypeID) {
	var newLocInfo = {}
	newLocInfo[LOCATION_INFO_IDS.BOT] = ""
	newLocInfo[LOCATION_INFO_IDS.TERRAIN] = terrainTypeID
	newLocInfo[LOCATION_INFO_IDS.ITEM] = ""
	return newLocInfo
}

function newBotInfo(state) {
	return {
		team: state.currentTeam,
		typeID: state.editingType,
	}
}
