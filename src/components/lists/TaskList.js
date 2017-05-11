import React, { PropTypes } from 'react'
import {
	Button,
	ListGroup,
	ListGroupItem,
	FormControl,
	Row,
	Col,
	Glyphicon
} from 'react-bootstrap'

import styles from 'stylesheets/tasklist.scss'
import { RowTaskList } from 'components/lists'

TaskList.propTypes = {
	callFilter: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	callModalAdd: PropTypes.func.isRequired,
	lists: PropTypes.array.isRequired,
	showPanelDetail: PropTypes.object.isRequired,
	checkboxComplated: PropTypes.func.isRequired,
	callPanelDetail: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired,
	callModalEdit: PropTypes.func.isRequired
}

function TaskList (props) {
	let { callFilter, filter, callModalAdd, lists, showPanelDetail, checkboxComplated, callPanelDetail, deleteList, callModalEdit } = props
	return (
		<ListGroup>
			<ListGroupItem>
				<Row>
					<Col xs={2}>
						<h4 className={styles.titleList}>
							<Glyphicon glyph='glyphicon glyphicon-console' /> Reminders
						</h4>
					</Col>
					<Col xs={8}>
						<FormControl componentClass='select' placeholder='filter' onChange={callFilter} value={filter}>
							<option value='all'>All</option>
							<option value='complete'>Complete</option>
							<option value='incomplete'>Incomplete</option>
						</FormControl>
					</Col>
					<Col xs={2} className={styles.button}>
						<Button
							bsStyle='primary'
							onClick={callModalAdd} >
							<Glyphicon glyph='glyphicon glyphicon-plus' />
						</Button>
					</Col>
				</Row>
			</ListGroupItem>
			{
				lists.filter(list => list.status === filter || filter === 'all').map(list => {
					let { id } = list
					return <RowTaskList
								key={id}
								list={list}
								showPanelDetail={showPanelDetail[id]}
								callPanelDetail={() => callPanelDetail(id)}
								checkboxComplated={(event) => checkboxComplated(event, list)}
								callModalEdit={() => callModalEdit(id)}
								deleteList={() => deleteList(id)} />
				})
			}
		</ListGroup>
	)
}

export default TaskList
