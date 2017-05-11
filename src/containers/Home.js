import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem, Checkbox, FormControl } from 'react-bootstrap'
import moment from 'moment'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'

const { deleteList, editList } = actions

class Home extends Component {
	constructor () {
		super()

		this.state = {
			showModalAdd: false,
			showModalEdit: false,
			taskId: undefined,
			filter: 'all'
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

	render () {
		return (
			<div>
				<h1>React Redux ToDoList</h1>
				<div>
					<FormControl componentClass='select' placeholder='filter' onChange={this._filter.bind(this)}>
						<option value='all'>All</option>
						<option value='complete'>Complete</option>
						<option value='incomplete'>Incomplete</option>
					</FormControl>
					Reminders {' '}
					<Button
						bsStyle='primary'
						bsSize='xsmall'
						onClick={this._callModalAdd} >
						+
					</Button>
				</div>
				<ListGroup>
					{
						this.props.lists.filter(list => list.status === this.state.filter || this.state.filter === 'all').map(list => {
							let { id, status, title, description, date } = list
							return (
								<ListGroupItem key={id} bsStyle={ (status === 'complete') ? 'success' : undefined }>
									<Checkbox onChange={(event) => this._checkboxComplated(event, list)} checked={status === 'complete'} inline />
									{id} {title} : {description} {moment(date).calendar()}
									<Button
										bsStyle='primary'
										bsSize='xsmall'
										onClick={() => this._callModalEdit(id)} >
										edit
									</Button>
									<Button
										bsStyle='danger'
										bsSize='xsmall'
										onClick={() => this.props.deleteList(id)} >
										delete
									</Button>
								</ListGroupItem>
							)
						})
					}
				</ListGroup>
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
