import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	Button,
	ButtonToolbar,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Checkbox,
	FormControl,
	Row,
	Col,
	FormGroup,
	Panel
} from 'react-bootstrap'
import moment from 'moment'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'
import styles from 'stylesheets/home.scss'

const { deleteList, editList } = actions

class Home extends Component {
	constructor () {
		super()

		this.state = {
			showModalAdd: false,
			showModalEdit: false,
			taskId: undefined,
			filter: 'all',
			showPanelDetail: {}
		}

		this._callModalAdd = this._callModalAdd.bind(this)
		this._callModalEdit = this._callModalEdit.bind(this)
	}

	_callModalAdd () {
		this.setState({ showModalAdd: !this.state.showModalAdd, taskId: this.props.lastId + 1 })
	}

	_callModalEdit (taskId) {
		this.setState({ showModalEdit: !this.state.showModalEdit, taskId })
	}

	_checkboxComplated (event, data) {
		this.props.editList({
			...data,
			status: (event.target.checked) ? 'complete' : 'incomplete'
		})
	}

	_filter (event) {
		this.setState({ filter: event.target.value })
	}

	_showPanelDetailList (id) {
		this.setState({ showPanelDetail: { ...this.state.showPanelDetail, [id]: !this.state.showPanelDetail[id] } })
	}

	render () {
		return (
			<div>
				<h1 className={styles.titleHeader}>React Redux ToDoList</h1>
				<hr />
				<Row>
					<Col xs={2} />
					<Col xs={8}>
						<ListGroup>
							<ListGroupItem>
								<Row>
									<Col xs={2}>
										<h4 className={styles.titleList}>Reminders</h4>
									</Col>
									<Col xs={8}>
										<FormControl componentClass='select' placeholder='filter' onChange={this._filter.bind(this)} value={this.state.filter}>
											<option value='all'>All</option>
											<option value='complete'>Complete</option>
											<option value='incomplete'>Incomplete</option>
										</FormControl>
									</Col>
									<Col xs={2} className={styles.button}>
										<Button
											bsStyle='primary'
											onClick={this._callModalAdd} >
											+
										</Button>
									</Col>
								</Row>
							</ListGroupItem>
							{
								this.props.lists.filter(list => list.status === this.state.filter || this.state.filter === 'all').map(list => {
									let { id, status, title, description, date } = list
									return (
										<ListGroupItem key={id} href='#' bsStyle={ (status === 'complete') ? 'success' : undefined } onClick={() => this._showPanelDetailList(id)}>
											<Row>
												<Col xs={2} className={styles.checkbox}>
													<Checkbox onChange={(event) => this._checkboxComplated(event, list)} checked={status === 'complete'} />
												</Col>
												<Col xs={8}>
													<div className={styles.titleTask}>{title}</div>
													<Panel collapsible expanded={this.state.showPanelDetail[id]} hidden={!this.state.showPanelDetail[id]}>
														<div><span className={styles.titleDetail}>Task ID:</span> <span className={styles.detail}>{id}</span></div>
														<div hidden={!description}><span className={styles.titleDetail}>Description:</span> <span className={styles.detail}>{description}</span></div>
														<div><span className={styles.titleDetail}>Date:</span> <span className={styles.detail}>{moment(date).calendar()}</span></div>
													</Panel>
												</Col>
												<Col xs={2} className={styles.button}>
													<Button
														bsStyle='success'
														onClick={() => this._callModalEdit(id)}
														block >
														Edit
													</Button>
													<Button
														bsStyle='danger'
														onClick={() => this.props.deleteList(id)}
														block >
														Delete
													</Button>
												</Col>
											</Row>
										</ListGroupItem>
									)
								})
							}
						</ListGroup>
					</Col>
					<Col xs={2} />
				</Row>
				<FormAddList
					showModal={this.state.showModalAdd}
					_callModal={this._callModalAdd}
					taskId={this.state.taskId} />
				<FormEditList
					showModal={this.state.showModalEdit}
					_callModal={this._callModalEdit}
					taskId={this.state.taskId} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	lastId: state.lists.lastId,
	lists: state.lists.data
})

const mapDispatchToProps = (dispatch) => ({
	deleteList (id) {
		dispatch(deleteList({ id }))
	},
	editList (data) {
		dispatch(editList(data))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
