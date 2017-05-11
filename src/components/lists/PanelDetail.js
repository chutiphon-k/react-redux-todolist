import React, { PropTypes } from 'react'
import moment from 'moment'
import { Panel } from 'react-bootstrap'

import styles from 'stylesheets/paneldetail.scss'

PanelDetail.propTypes = {
	id: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	showPanelDetail: PropTypes.bool,
	description: PropTypes.string
}

function PanelDetail (props) {
	let { showPanelDetail, id, description, date } = props
	return (
		<Panel collapsible expanded={showPanelDetail} hidden={!showPanelDetail}>
			<div><span className={styles.titleDetail}>Task ID:</span> <span className={styles.detail}>{id}</span></div>
			<div hidden={!description}><span className={styles.titleDetail}>Description:</span> <span className={styles.detail}>{description}</span></div>
			<div><span className={styles.titleDetail}>Date:</span> <span className={styles.detail}>{moment(date).calendar()}</span></div>
		</Panel>
	)
}

export default PanelDetail
