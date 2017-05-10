import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'

import * as actions from 'actions'
import { TestComponent } from 'components'

const { getTest } = actions

class Home extends Component {
	constructor () {
		super()

		this.state = {
			data: []
		}

		this._addRandom = this._addRandom.bind(this)
	}

	_addRandom () {
		this.setState({ data: [ ...this.state.data, Math.random() ] })
	}

	render () {
		return (
			<div>
				<div className="content">
					<h1>Home</h1>
						{
							JSON.stringify(this.props.test)
						}
				</div>
				<button className="button is-danger" onClick={this.props.getTest}>
					Load
				</button>
				<br />
				<Link to='/about'>
					<button className="button is-primary is-large">Button</button>
				</Link>
				<br />
				<Button onClick={this._addRandom}>Add</Button>
				<TestComponent data={this.state.data} />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.test.get.data
})

const mapDispatchToProps = (dispatch) => ({
	getTest () {
		dispatch(getTest())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
