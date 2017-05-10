import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'

import * as actions from 'actions'
import { ModalFormList } from 'components/lists'

const { addList } = actions

class FormEditList extends Component {
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

const mapStateToProps = (state) => ({
	initialValues: {
		title: 'eieiza',
		description: 'asdas'
	}
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onSubmit (data) {
		ownProps._callModalAdd()
		dispatch(addList(data))
	},
	onSubmitSuccess () {
		dispatch(reset('formEditList'))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'formEditList',
	validate
})(FormEditList))
