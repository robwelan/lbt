import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import FixedMenuLayout from '../../components/fixed-layout'

class SidebarLeftPush extends Component {
	state = { visible: false }

	componentWillReceiveProps(nextProps) {
		let stateUpdate = { ...this.state }
		let shouldStateUpdate = false

		if (nextProps.state.menu !== this.state.visible) {
			stateUpdate.visible = nextProps.state.menu.left
			shouldStateUpdate = true
		}
		if (shouldStateUpdate === true) {
			this.setState(stateUpdate)
		}
	}

	//	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	render() {
		const { visible } = this.state
		return (
			// <div>
			// 	<Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
			<Sidebar.Pushable as={Segment}>
				<Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
					<Menu.Item name="home">
						<Icon name="home" />
						Home
					</Menu.Item>
					<Menu.Item name="gamepad">
						<Icon name="gamepad" />
						Games
					</Menu.Item>
					<Menu.Item name="camera">
						<Icon name="camera" />
						Channels
					</Menu.Item>
				</Sidebar>
				<Sidebar.Pusher>
					<Segment basic>
						<FixedMenuLayout />
					</Segment>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
			//	</div>
		)
	}
}

//export default SidebarLeftPush
//export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeftPush)

export default connect(state => {
	const newProps = {
		state: { ...state.screen }
	}

	return newProps
})(SidebarLeftPush)
