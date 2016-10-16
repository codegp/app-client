import { createAction, handleActions } from 'redux-actions'
import { CreateUrl } from '../../utils/utils'
var request = require('axios');

// ------------------------------------
// Async action dispatchers
// ------------------------------------

export function fetchGameTypes () {
	let url = CreateUrl("gametypes/")

	return (dispatch, getState) => {
		request.get(url)
			.then( resp => dispatch(setGameType(resp.data)))
			.catch(err => console.log(err))
	}
}

// export function fetchGameTypes () => {
// 	config: {
// 		url: CreateUrl("gametypes/"),
// 		method: 'GET',
// 	},
// 	responseAction: setGameType,
// }

// ------------------------------------
// Constants
// ------------------------------------
const SET_GAME_TYPES = 'SET_GAME_TYPES'
const ADD_GAME_TYPE = 'ADD_GAME_TYPE'

// ------------------------------------
// Actions
// ------------------------------------
const setGameType = createAction(SET_GAME_TYPES)
const addGameType = createAction(ADD_GAME_TYPE)
export const actions = {
	addGameType,
	fetchGameTypes,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	ADD_GAME_TYPE: (state, action) => state.concat(action.payload),
  SET_GAME_TYPES: (state, action) => action.payload,
}, [])
