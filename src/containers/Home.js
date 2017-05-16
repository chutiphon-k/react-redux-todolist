import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import * as actions from 'actions'
import { FormAddList, FormEditList } from 'containers/lists'
import styles from 'stylesheets/home.scss'
import { TaskList } from 'components/lists'

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

		this.callModalAdd = this.callModalAdd.bind(this)
		this.callModalEdit = this.callModalEdit.bind(this)
		this.callFilter = this.callFilter.bind(this)
	}

	callModalAdd () {
		this.setState({ showModalAdd: !this.state.showModalAdd, taskId: this.props.lastId + 1 })
	}

	callModalEdit (taskId) {
		this.setState({ showModalEdit: !this.state.showModalEdit, taskId })
	}

	checkboxComplated (event, data) {
		this.props.editList({
			...data,
			status: (event.target.checked) ? 'complete' : 'incomplete'
		})
	}

	callFilter (event) {
		this.setState({ filter: event.target.value })
	}

	callPanelDetail (id) {
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
						<TaskList
							callFilter={this.callFilter}
							filter={this.state.filter}
							callModalAdd={this.callModalAdd}
							lists={this.props.lists}
							showPanelDetail={this.state.showPanelDetail}
							callPanelDetail={(id) => this.callPanelDetail(id)}
							checkboxComplated={(event, list) => this.checkboxComplated(event, list)}
							callModalEdit={(id) => this.callModalEdit(id)}
							deleteList={this.props.deleteList} />
					</Col>
					<Col xs={2} />
				</Row>
				<FormAddList
					showModal={this.state.showModalAdd}
					callModal={this.callModalAdd}
					taskId={this.state.taskId} />
				<FormEditList
					showModal={this.state.showModalEdit}
					callModal={this.callModalEdit}
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
