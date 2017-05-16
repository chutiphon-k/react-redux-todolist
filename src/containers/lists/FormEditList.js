import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import * as actions from 'actions'
import { ModalFormList } from 'components/lists'

const { editList } = actions

class FormEditList extends Component {
	static propTypes = {
		showModal: PropTypes.bool.isRequired,
		callModal: PropTypes.func.isRequired,
		taskId: PropTypes.number
	}

	render () {
		return (
			<ModalFormList
				showModal={this.props.showModal}
				onHide={this.props.callModal}
				handleSubmit={this.props.handleSubmit}
				submit={this.props.submit}
				reset={this.props.reset}
				meta={this.props.meta}
				modalTitle='EDIT' />
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
	initialValues: state.lists.data.find(list => list.id === ownProps.taskId)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (data) {
		ownProps.callModal()
		dispatch(editList(data))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'formEditList',
	enableReinitialize: true,
	validate
})(FormEditList))
