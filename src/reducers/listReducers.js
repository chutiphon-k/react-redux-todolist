const initialState = {
	data: []
}

export default (state = initialState, action) => {
	let tmpData = []
	switch (action.type) {
		case 'ADD_LIST':
			return {
				...state,
				data: [ ...state.data, action.payload ]
			}
		case 'EDIT_LIST':
			tmpData = [ ...state.data ]
			tmpData[action.taskId] = action.payload
			return {
				...state,
				data: tmpData
			}
		default:
			return state
	}
}
