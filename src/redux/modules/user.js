import { createAction, handleActions } from 'redux-actions'
import { CreateUrl } from '../../utils/utils'
var request = require('axios');
// ------------------------------------
// Async action dispatchers
// ------------------------------------
export function getAndSetUser () {
	let url = CreateUrl("user")
	
	return (dispatch, getState) => {
		request.get(url)
			.then( resp => dispatch(setUser(resp.data)))
			.catch(err => console.log(err))
	}
}

// ------------------------------------
// Constants
// ------------------------------------
const SET_USER = 'SET_USER'

// ------------------------------------
// Actions
// ------------------------------------
const setUser = createAction(SET_USER)

export const actions = {
	getAndSetUser,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  SET_USER: (state, action) => Object.assign({}, action.payload),
}, {})
