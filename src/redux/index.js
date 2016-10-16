import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import round from './modules/round'
import history from './modules/history'
import resize from './modules/resize'
import play from './modules/play'
import user from './modules/user'
import projects from './modules/projects'
import gametypes from './modules/gametypes'
import currentProject from './modules/currentProject'
import types from './modules/types'
import typeCreators from './modules/typeCreators'
import gameTypeCreator from './modules/gameTypeCreator'
import mapCreator from './modules/mapCreator'
import games from './modules/games'
// import * as reducers from './reducers'


export default combineReducers({
  // ...reducers
  routing: routerReducer,
  round,
  history,
  resize,
  play,
  user,
  projects,
  gametypes,
  currentProject,
  types,
  games,
  typeCreators,
  gameTypeCreator,
  mapCreator,
})
