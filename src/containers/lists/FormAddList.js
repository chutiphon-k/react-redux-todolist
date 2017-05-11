import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import moment from 'moment'

import * as actions from 'actions'
import { ModalFormList } from 'components/lists'

const { addList } = actions

class FormAddList extends Component {
	static propTypes = {
		showModal: PropTypes.bool.isRequired,
		_callModal: PropTypes.func.isRequired,
		taskId: PropTypes.number
	}

	render () {
		return (
			<ModalFormList
				showModal={this.props.showModal}
				onHide={this.props._callModal}
				handleSubmit={this.props.handleSubmit}
				submit={this.props.submit}
				reset={this.props.reset}
				meta={this.props.meta}
				modalTitle='ADD' />
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

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (data) {
		ownProps._callModal()
		dispatch(addList({
			...data,
			id: ownProps.taskId,
			status: 'incomplete',
			date: moment().toISOString()
		}))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'formAddList',
	validate
})(FormAddList))
