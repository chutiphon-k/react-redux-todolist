import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import listReducers from 'reducers/listReducers'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	lists: listReducers
})
