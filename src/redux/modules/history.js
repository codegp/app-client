import { createAction, handleActions } from 'redux-actions'
var request = require('axios');
import { CreateUrl } from '../../utils/utils'

// ------------------------------------
// Async action dispatchers
// ------------------------------------
export function fetchHistory (game_key) {
	let url = CreateUrl(`game/${game_key}/history`)
	return (dispatch, getState) => {
		request.get(url)
			.then( resp => dispatch(setHistory(resp.data)))
			.catch(err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_HISTORY = 'SET_HISTORY'

// ------------------------------------
// Actions
// ------------------------------------
const setHistory = createAction(SET_HISTORY)

export const actions = {
	fetchHistory,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  SET_HISTORY: (state, action) => Object.assign({}, action.payload),
}, {})
