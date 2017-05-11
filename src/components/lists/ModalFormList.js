import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { Modal, Button } from 'react-bootstrap'

import styles from 'stylesheets/formlist.scss'

ModalFormList.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired
}

const renderField = ({input, label, type, meta: {touched, error}}) => (
	<div>
		<label>{label}</label>
		<div>
			<input {...input} type={type} />{' '}
			{touched && error && <span className={styles.error}>{error}</span>}
		</div>
	</div>
)

function ModalFormList (props) {
	let { showModal, onHide, handleSubmit, submit, reset, modalTitle } = props
	return (
		<Modal show={showModal} onHide={onHide} onExited={reset}>
			<Modal.Header closeButton>
				<Modal.Title>{modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<Field component={renderField} name='title' label='Title' autoFocus />
					<Field component={renderField} name='description' label='Description' />
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle='danger' type='reset' onClick={reset}>Reset</Button>
				<Button bsStyle='primary' type='submit' onClick={submit}>Save</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalFormList
