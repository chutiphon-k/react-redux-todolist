import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { Modal, Button } from 'react-bootstrap'

ModalFormList.propTypes = {
	showModal: PropTypes.bool.isRequired,
	_onHide: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
}

function ModalFormList (props) {
	let { showModal, _onHide, handleSubmit, submit, reset } = props
	return (
		<Modal show={showModal} onHide={_onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add List</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					Title: <Field component='input' name='title' autoFocus />
					<br />
					Description: <Field component='input' name='description' />
					<button type='submit' onClick={submit} hidden />
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle='primary' type='submit' onClick={submit}>Submit</Button>
				<Button type='reset' onClick={reset}>Reset</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalFormList
