import React, { PropTypes } from 'react'

TestComponent.propTypes = {
	data: PropTypes.array.isRequired
}

function TestComponent (props) {
	let { data } = props
	return (
		<ul>
			{
				data.map((value, index) => {
					return <li key={index}>{value}</li>
				})
			}
		</ul>
	)
}

export default TestComponent
