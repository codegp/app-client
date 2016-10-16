import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
const SET_ROUND = 'SET_ROUND'

// ------------------------------------
// Actions
// ------------------------------------
const setRound = createAction(SET_ROUND)

export const actions = {
	setRound
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_ROUND: (state, action) => Object.assign({}, {num: action.payload})
}, {num: 0}) // TODO: combine with play store??
