import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_PLAYING = 'SET_PLAYING'

// ------------------------------------
// Actions
// ------------------------------------
const setPlaying = createAction(SET_PLAYING)

export const actions = {
	setPlaying
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_PLAYING: (state, action) => Object.assign({}, {playing: action.payload})
}, {playing: false})
