import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

import * as actions from 'actions'

const { addList } = actions

class Home extends Component {
	render () {
		return (
			<div>
				<h1>React Redux ToDoList</h1>
				<div>
					Reminders {' '}
					<Button bsStyle='primary'
						bsSize='xsmall'
						onClick={() => this.props.addList(Math.random())} >
						+
					</Button>
				</div>
				<ListGroup>
					{
						this.props.lists.map((value, index) => {
							return (
								<ListGroupItem key={index}>{value}</ListGroupItem>
							)
						})
					}
				</ListGroup>
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
