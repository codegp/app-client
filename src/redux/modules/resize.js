import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_SIZE = 'SET_SIZE'

// ------------------------------------
// Actions
// ------------------------------------
const setSize = createAction(SET_SIZE)

export const actions = {
	setSize
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_SIZE: (state, action) => Object.assign({}, {width: action.payload.currentTarget.innerWidth, height: action.payload.currentTarget.innerHeight})
}, {
	width: window.innerWidth,
	height: window.innerHeight
})
