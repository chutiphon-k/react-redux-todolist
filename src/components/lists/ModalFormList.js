import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import {
	Modal,
	Button,
	Col,
	Row,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap'

import styles from 'stylesheets/modalformlist.scss'

ModalFormList.propTypes = {
	showModal: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired
}

const renderField = ({input, label, type, meta: {touched, error}}) => (
	<div className={styles.fieldInput}>
		<FormGroup validationState={ (touched && error) ? 'error' : null }>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...input} type={type} />
		</FormGroup>
	</div>
)

function ModalFormList (props) {
	let { showModal, onHide, handleSubmit, submit, reset, modalTitle } = props
	return (
		<Modal show={showModal} onHide={onHide} onExited={reset}>
			<Modal.Header closeButton>
				<Modal.Title componentClass='h3'>
					<div className={styles.titleModal}>{modalTitle}</div>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col xs={2} />
					<Col xs={8}>
						<form onSubmit={handleSubmit}>
							<Field component={renderField} name='title' label='Title' autoFocus />
							<Field component={renderField} name='description' label='Description' />
						</form>
					</Col>
					<Col xs={2} />
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button}>
					<Button bsStyle='danger' type='reset' onClick={reset}>Reset</Button>
					<Button bsStyle='primary' type='submit' onClick={submit}>Save</Button>
				</div>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalFormList
