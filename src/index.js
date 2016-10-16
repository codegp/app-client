import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux'

import CoreLayout from './layouts/CoreLayout.js'
import GameTypes from './views/GameTypes/GameTypes.js'
import GameType from './views/GameType/GameType.js'
import Games from './views/Game/Games.js'
import Game from './views/Game/Game.js'

import GameView from './views/GameView/GameView.js'
import MapBuilder from './views/MapBuilder/MapBuilder.js'
import MyProjects from './views/MyProjects/MyProjects'
import EditorView from './views/Editor/EditorView.js'
import CreatorView from './views/Creator/CreatorView.js'
import Splash from './views/Splash/Splash.js'

import reducer from './redux'


const middleware = [ thunk, routerMiddleware(browserHistory) ]
if (!__PROD__) {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
/*

  <Route path='/creator/:creatorType' component={CreatorView} />
  <Route path='/gametypes' component={GameTypes} />
  <Route path='/gametype/:gameTypeID' component={GameType} />
  <Route path='/viewer/:gameID' component={GameView} />
  <Route path='/mapbuilder' component={MapBuilder} />
  <Route path='/mapbuilder/:gameTypeID' component={MapBuilder} />
  <Route path='/projects' component={MyProjects} />
  <Route path='/project/:projectID' component={EditorView} />
*/
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={CoreLayout}>
        <Route path='/projects' component={MyProjects} />
        <Route path='/creator/:creatorType' component={CreatorView} />
        <Route path='/gametypes' component={GameTypes} />
        <Route path='/gametype/:gameTypeID' component={GameType} />
        <Route path='/mapbuilder' component={MapBuilder} />
        <Route path='/mapbuilder/:gameTypeID' component={MapBuilder} />
        <Route path='/projects' component={MyProjects} />
        <Route path='/project/:projectID' component={EditorView} />
        <Route path='/project/:projectID/games' component={Games} />
        <Route path='/project/:projectID/game/:gameID' component={Game} />
        <Route path='/project/:projectID/game/:gameID/viewer' component={GameView} />
        <IndexRoute component={Splash} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
