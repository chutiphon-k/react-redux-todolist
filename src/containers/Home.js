import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem, Checkbox, FormControl } from 'react-bootstrap'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'

const { deleteList, editList } = actions

class Home extends Component {
	constructor () {
		super()

		this.state = {
			showModalAdd: false,
			showModalEdit: false,
			taskId: undefined
		}

		this._callModalAdd = this._callModalAdd.bind(this)
		this._callModalEdit = this._callModalEdit.bind(this)
	}

	_callModalAdd () {
		this.setState({ showModalAdd: !this.state.showModalAdd, taskId: this.props.lists.length + 1 })
	}

	_callModalEdit (taskId) {
		this.setState({ showModalEdit: !this.state.showModalEdit, taskId })
	}

	_checkboxComplated (event, data) {
		this.props.editList({
			...data,
			isComplated: event.target.checked
		})
	}

	_getFilter (event) {
		console.log(event)
	}

	render () {
		return (
			<div>
				<h1>React Redux ToDoList</h1>
				<div>
					<FormControl componentClass='select' placeholder='filter' onChange={this._getFilter}>
						<option value={undefined}>All</option>
						<option value='complated'>Complated</option>
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
						this.props.lists.map((list, index) => {
							return (
								<ListGroupItem key={index} bsStyle={(list.isComplated) ? 'danger' : undefined}>
									<Checkbox onChange={(event) => this._checkboxComplated(event, list)} inline />
									{list.id} {list.title} : {list.description}
									<Button
										bsStyle='primary'
										bsSize='xsmall'
										onClick={() => this._callModalEdit(list.id)} >
										edit
									</Button>
									<Button
										bsStyle='danger'
										bsSize='xsmall'
										onClick={() => this.props.deleteList(list.id)} >
										delete
									</Button>
								</ListGroupItem>
							)
						})
					}
				</ListGroup>
				<FormAddList showModal={this.state.showModalAdd} _callModal={this._callModalAdd} taskId={this.state.taskId} />
				<FormEditList showModal={this.state.showModalEdit} _callModal={this._callModalEdit} taskId={this.state.taskId} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
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
