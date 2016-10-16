
const LOADING = 'LOADING'
const REQUEST = 'request'
const request = createAction(REQUEST)

const requestMiddleware = store => next => action => {
  if(action.type !== REQUEST) return next(action)

  let {
    config,
    responseAction,
    responseMutator,
    loadingAction,
  } = action.payload

  if (loadingAction) {
    store.dispatch(loadingAction(LOADING))
  }

  return request(config)
    .then( resp => {
      if (!responseAction) return

      let responseActionPayload = resp
      if (responseMutator) {
        responseActionPayload = responseMutator(resp)
      }

      return store.dispatch(responseAction(responseActionPayload))
    }).catch( err => console.log(err))
}

/*
  Request payloads
  {
    Config
    ResponseAction
    ResponseMutator (optional)
    LoadingAction (optional)
  }
*/
