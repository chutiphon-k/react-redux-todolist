import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'

const { addList } = actions

class Home extends Component {
	constructor () {
		super()

		this.state = {
			showModalAdd: false,
			showModalEdit: false
		}

		this._callModalAdd = this._callModalAdd.bind(this)
		this._callModalEdit = this._callModalEdit.bind(this)
	}

	_callModalAdd () {
		this.setState({ showModalAdd: !this.state.showModalAdd })
	}

	_callModalEdit () {
		this.setState({ showModalEdit: !this.state.showModalEdit })
	}

	render () {
		return (
			<div>
				<h1>React Redux ToDoList</h1>
				<div>
					Reminders {' '}
					<Button bsStyle='primary'
						bsSize='xsmall'
						onClick={this._callModalAdd} >
						+
					</Button>
				</div>
				<Button bsStyle='primary'
					bsSize='xsmall'
					onClick={this._callModalEdit} >
					edit
				</Button>
				<ListGroup>
					{
						this.props.lists.map((list, index) => {
							return (
								<ListGroupItem key={index}>{list.title} : {list.description}</ListGroupItem>
							)
						})
					}
				</ListGroup>
				<FormAddList showModal={this.state.showModalAdd} _callModal={this._callModalAdd} />
				<FormEditList showModal={this.state.showModalEdit} _callModal={this._callModalEdit} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	lists: state.lists.data
})

const mapDispatchToProps = (dispatch) => ({
	addList (data) {
		dispatch(addList(data))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
