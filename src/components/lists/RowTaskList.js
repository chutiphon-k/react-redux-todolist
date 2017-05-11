import React, { PropTypes } from 'react'
import {
	ListGroupItem,
	Row,
	Col,
	Checkbox,
	Button,
	Glyphicon
} from 'react-bootstrap'

import styles from 'stylesheets/tasklist.scss'
import { PanelDetail } from 'components/lists'

RowTaskList.propTypes = {
	list: PropTypes.object.isRequired,
	checkboxComplated: PropTypes.func.isRequired,
	callPanelDetail: PropTypes.func.isRequired,
	callModalEdit: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired,
	showPanelDetail: PropTypes.bool
}

function RowTaskList (props) {
	let { list: { id, status, title, description, date }, checkboxComplated, showPanelDetail, callPanelDetail, callModalEdit, deleteList } = props
	return (
		<ListGroupItem key={id} href='#' bsStyle={ (status === 'complete') ? 'success' : undefined } onClick={callPanelDetail}>
			<Row>
				<Col xs={2} className={styles.checkbox}>
					<Checkbox onChange={checkboxComplated} checked={status === 'complete'} />
				</Col>
				<Col xs={8}>
					<div className={styles.titleTask}>{title}</div>
					<PanelDetail
						showPanelDetail={showPanelDetail}
						description={description}
						date={date}
						id={id} />
				</Col>
				<Col xs={2} className={styles.button}>
					<Button
						bsStyle='success'
						onClick={callModalEdit}
						block >
						<Glyphicon glyph='glyphicon glyphicon-pencil' />
					</Button>
					<Button
						bsStyle='danger'
						onClick={deleteList}
						block >
						<Glyphicon glyph='glyphicon glyphicon-erase' />
					</Button>
				</Col>
			</Row>
		</ListGroupItem>
	)
}

export default RowTaskList
