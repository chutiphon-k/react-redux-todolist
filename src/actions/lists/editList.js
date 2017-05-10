export default (data, taskId) => ({
	type: 'EDIT_LIST',
	taskId,
	payload: data
})
