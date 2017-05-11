import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
// import persistState from 'redux-localstorage'

import rootReducer from 'reducers'

export default (history) => {
	const middlewares = [ thunk, apiMiddleware, routerMiddleware(history) ]
	const enhancer = compose(
		applyMiddleware(...middlewares)
	)

	const store = createStore(
		rootReducer,
		enhancer
	)

	return store
}
