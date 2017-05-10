import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'

const { deleteList } = actions

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
	state = {
		showModalAdd: false,
		showModalEdit: false,
		taskId: undefined
	}

	_callModalAdd () {
		this.setState({ showModalAdd: !this.state.showModalAdd })
	}

	_callModalEdit (taskId) {
		this.setState({ showModalEdit: !this.state.showModalEdit, taskId })
	}

	render () {
		return (
			<div>
				<h1>React Redux ToDoList</h1>
				<div>
					Reminders {' '}
					<Button
						bsStyle='primary'
						bsSize='xsmall'
						onClick={() => this._callModalAdd()} >
						+
					</Button>
				</div>
				<ListGroup>
					{
						this.props.lists.map((list, index) => {
							return (
								<ListGroupItem key={index}>
									{index} {list.title} : {list.description}
									<Button
										bsStyle='primary'
										bsSize='xsmall'
										onClick={() => this._callModalEdit(index)} >
										edit
									</Button>
									<Button
										bsStyle='danger'
										bsSize='xsmall'
										onClick={() => this.props.deleteList(index)} >
										delete
									</Button>
								</ListGroupItem>
							)
						})
					}
				</ListGroup>
				<FormAddList showModal={this.state.showModalAdd} _callModal={this._callModalAdd} />
				<FormEditList showModal={this.state.showModalEdit} _callModal={this._callModalEdit} taskId={this.state.taskId} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	lists: state.lists.data
})

const mapDispatchToProps = (dispatch) => ({
	deleteList (taskId) {
		dispatch(deleteList(taskId))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
