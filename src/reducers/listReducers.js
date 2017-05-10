const initialState = {
	data: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LIST':
			return {
				...state,
				data: [ ...state.data, action.payload ]
			}
		default:
			return state
	}
}
