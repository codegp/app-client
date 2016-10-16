import { createAction, handleActions } from 'redux-actions'
import { replace } from 'react-router-redux'
import { sprintf } from 'sprintf-js'
import { CreateUrl } from '../../utils/utils'

var request = require('axios');

export const DEFAULT_STATE = {
	botTypes: [],
	attackTypes: [],
	itemTypes: [],
	terrainTypes: [],
	moveTypes: [],
}

// ------------------------------------
// Async action dispatchers
// ------------------------------------
function fetchTypes () {
	let url = CreateUrl("types/")
	return (dispatch, getState) => {
		request.get(url)
			.then( resp => dispatch(setTypes(resp.data)))
			.catch(err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_TYPES = 'SET_TYPES'
const ADD_TYPE = 'ADD_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
const setTypes = createAction(SET_TYPES)
const addType = createAction(ADD_TYPE)

export const actions = {
	addType,
	fetchTypes
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
		SET_TYPES: (state, action) => Object.assign({}, state, action.payload ),
		ADD_TYPE: _addType
}, DEFAULT_STATE)

function _addType (state, action) {
  let newTypes = {}
	let key = `${action.payload.type}s`
  newTypes[key] = state[key].concat(action.payload.info)
  return Object.assign({}, state, newTypes)
}
