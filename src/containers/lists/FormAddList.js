import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'

import * as actions from 'actions'
import { ModalFormList } from 'components/lists'

const { addList } = actions

class FormAddList extends Component {
	static propTypes = {
		showModal: PropTypes.bool.isRequired,
		_callModal: PropTypes.func.isRequired
	}

	render () {
		return (
			<ModalFormList
				showModal={this.props.showModal}
				_onHide={this.props._callModal}
				handleSubmit={this.props.handleSubmit}
				submit={this.props.submit}
				reset={this.props.reset} />
		)
	}
}

const validate = values => {
	let { title } = values
	const errors = {}

	if (!title || title.trim() === '') {
		errors.title = 'Required'
	}

	return errors
}

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		id: ownProps.taskId,
		isComplated: false
	}
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (data) {
		ownProps._callModal()
		dispatch(addList(data))
	},
	onSubmitSuccess () {
		dispatch(reset('formAddList'))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'formAddList',
	validate,
	enableReinitialize: true
})(FormAddList))
