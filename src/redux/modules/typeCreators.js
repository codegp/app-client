import { createAction, handleActions } from 'redux-actions'
import { actions as typesActions } from './types'
import { getDefaultTypes } from '../../utils/defaultTypes'
var request = require('axios');

// ------------------------------------
// Constants
// ------------------------------------
const UPDATE_TYPE = 'UPDATE_TYPE'
const RESET_TYPE = 'RESET_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
const updateType = createAction(UPDATE_TYPE)
const resetType = createAction(RESET_TYPE)

export const actions = {
	updateType,
  submitType
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	UPDATE_TYPE: _updateType,
	RESET_TYPE: _resetType,
}, getDefaultTypes())

function _updateType (state, action) {
	var type = action.payload.type

	// create a new object for the specific type
	// and update the specified property
  var newType = Object.assign({}, state[type])
  newType[action.payload.key] = action.payload.val

	// create a new state object and update the specified type
	var newState = Object.assign({}, state)
	newState[type] = newType
  return newState
}

function _resetType (state, action) {
	var newState = Object.assign({}, state)
	var defaulted = getDefaultTypes()[action.payload]
	newState[action.payload] = defaulted
	console.log(newState)
	return newState
}

// ------------------------------------
// Async action dispatchers
// ------------------------------------
function submitType (payload) {
	var type = payload.type
	var iconData = payload.creator.iconData
	var postData = _getPostData(payload.creator)
	var url = `/console/${type}`

	return (dispatch, getState) => {
		// dispatch an event to say we are loading
		dispatch(updateType({type: type, key: 'loading', val: true}))

		request.post(url, postData)
			.then( resp => _handleTypeSubmitSuccess(dispatch, resp, iconData, type))
			.catch( err => console.log(err))
	}
}

function _handleTypeSubmitSuccess(dispatch, resp, iconData, type) {
	// move type doesn't need to submit an icon
	if (!iconData) {
		_clearLoadingAndAddType(dispatch, type, resp.data)
		return
	}

	_submitIcon(type, resp.data.ID, iconData)
		.then( () => _clearLoadingAndAddType(dispatch, type, resp.data))
		.catch( err => console.log(err))
}

function _getPostData(creator) {
	var postData = Object.assign({}, creator)
	// server doesn't care about loading and icon is sent
	// after the entity is created
	delete postData["iconData"]
	delete postData["loading"]
	return postData
}

function _clearLoadingAndAddType(dispatch, type, info) {
	 // adds type to types store
	 dispatch(typesActions.addType({type: type, info: info}))
	 // resets the current form
	 dispatch(resetType(type))
}

function _submitIcon (type, id, iconData) {
	var iconUrl = `/console/type/${id}/icon`
	var data = new FormData();
	data.append("iconData", iconData)
	return request.post(iconUrl, data)
}
