const initialState = {
	data: []
}

export default (state = initialState, action) => {
	let tmpData = []
	let index

	switch (action.type) {
		case 'ADD_LIST':
			return {
				...state,
				data: [ ...state.data, action.payload ]
			}
		case 'EDIT_LIST':
			tmpData = [ ...state.data ]
			index = tmpData.findIndex(list => list.id === action.payload.id)
			tmpData[index] = action.payload
			return {
				...state,
				data: tmpData
			}
		case 'DELETE_LIST':
			tmpData = [ ...state.data ]
			index = tmpData.findIndex(list => list.id === action.payload.id)
			tmpData.splice(index, 1)
			return {
				...state,
				data: tmpData
			}
		default:
			return state
	}
}
