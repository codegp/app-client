import { createAction, handleActions } from 'redux-actions'
import { replace } from 'react-router-redux'
import { CreateUrl } from '../../utils/utils'

var request = require('axios');

// ------------------------------------
// Async action dispatchers
// ------------------------------------
function fetchGamesForProject(projectID) {
	let url = CreateUrl(`project/${projectID}/games/`)
	return (dispatch, getState) => {
		let loadingPayload = payloads.loadingProject(projectID)
		dispatch(setLoadingGamesForProject(loadingPayload))

		request.get(url)
			.then( resp => {
        let games = resp.data
				let loadedPayload = loadedProjectPayload(projectID, games)
        dispatch(setGamesForProject(loadedPayload))

        // start polling for game completion on any pending games
        // for (let i in games) {
        //   if (!games[i].complete) {
        //     _pollForGameToComplete(dispatch, games[i], projectID)
        //   }
        // }
      })
			.catch(err => console.log(err))
	}
}

function createGameForProject(projectID, mapID) {
  let url = CreateUrl(`project/${projectID}/map/${mapID}/game`)

	return (dispatch, getState) => {
		request.post(url)
			.then( resp => {
        let game = resp.data
				let payload = addGameToProjectPayload(projectID, game)
        dispatch(addGameToProject(payload))
				dispatch(replace(`/project/${projectID}/game/${game.ID}`))
        // _pollForGameToComplete(dispatch, game, projectID)
      })
			.catch( err => console.log(err))
	}
}

function _pollForGameToComplete(dispatch, game, projectID) {
  let url = CreateUrl(`game/${game.ID}`)
  let pollerID = setInterval(() => {
    request.get(url)
      .then( resp => {
        let game = resp.data
        if (game.complete) {
          dispatch(addGameToProject({game: game, projectID: projectID}))
          clearInterval(pollerID)
        }
      })
  }, 1000);
}


// ------------------------------------
// Constants
// ------------------------------------
const SET_LOADING_GAMES_FOR_PROJECT = 'SET_LOADING_GAMES_FOR_PROJECT'
const SET_GAMES_FOR_PROJECT = 'SET_GAMES_FOR_PROJECT'
const ADD_GAME = 'ADD_GAME'

// ------------------------------------
// Actions
// ------------------------------------
const setLoadingGamesForProject = createAction(SET_LOADING_GAMES_FOR_PROJECT)
const setGamesForProject = createAction(SET_GAMES_FOR_PROJECT)
const addGameToProject = createAction(ADD_GAME)

export const actions = {
	fetchGamesForProject,
	createGameForProject,
}

// ------------------------------------
// Action Payloads
// ------------------------------------

function loadingProject(projectID) {
	return {
		projectID: projectID,
	}
}

function loadedProjectPayload(projectID, games) {
	return {
		projectID: projectID,
		games: games,
	}
}

function addGameToProjectPayload(projectID, game) {
	return {
		projectID: projectID,
		game: game,
	}
}

export const payloads = {
	loadingProject,
	loadedProjectPayload,
	addGameToProjectPayload
}


// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	SET_LOADING_GAMES_FOR_PROJECT: (state, action) => Object.assign({}, state, _loadingProject(action.payload)),
  SET_GAMES_FOR_PROJECT: (state, action) => Object.assign({}, state, _loadedProject(action.payload)),
	ADD_GAME: _addGameToProject,
}, {})

function _loadingProject(payload) {
	let {projectID} = payload
	let loadingProj = {}
	loadingProj[projectID] = {loading: true, games: []}
	return loadingProj
}

function _loadedProject(payload) {
	let {projectID, games} = payload
	let loadedProj = {}
	loadedProj[projectID] = {loading: false, games: games}
	return loadedProj
}

function _addGameToProject(state, action) {
	let {projectID, game} = action.payload
  let projectGames = state[projectID]
	if (!projectGames) {
		state[projectID] = {loading: false, games: []}
	}
	state[projectID].games.push(game)
	return Object.assign({}, state)
}
