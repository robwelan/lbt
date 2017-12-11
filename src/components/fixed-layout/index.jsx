import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../predictable-state-container/actions/retrieve-data'
import { Container, Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react'
import TopMenu from './top-menu'

class FixedMenuLayout extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(nextProps) {
		// let stateUpdate = { ...this.state }
		// let shouldStateUpdate = false
		// if (nextProps.state.menu !== this.state.visible) {
		// 	stateUpdate.visible = nextProps.state.menu.left
		// 	shouldStateUpdate = true
		// }
		// if (shouldStateUpdate === true) {
		// 	this.setState(stateUpdate)
		// }
	}

	componentDidMount() {
		this.props.retrieveDataAsync()
	}

	render() {
		return (
			<div>
				<TopMenu />

				<Container text style={{ marginTop: '7em' }}>
					<Header as="h1">Semantic UI React Fixed Template</Header>
					<p>This is a basic fixed menu template using fixed size containers.</p>
					<p>A text container is used for the main container, which is useful for single column layouts.</p>

					<Image src="/assets/images/wireframe/media-paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
					<Image src="/assets/images/wireframe/paragraph.png" style={{ marginTop: '2em' }} />
				</Container>
			</div>
		)
	}
}

export default connect(
	state => {
		const newProps = {
			state: { ...state.screen }
		}

		return newProps
	},
	{ ...actionCreators }
)(FixedMenuLayout)
