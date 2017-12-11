import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../predictable-state-container/actions/header-menu'
import { Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react'

class TopMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			menu: {
				left: false
			}
		}

		this.setMenuVisibility = this.setMenuVisibility.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		let stateUpdate = { ...this.state }
		let shouldStateUpdate = false

		if (nextProps.state.menu !== this.state.visible) {
			stateUpdate.menu.left = nextProps.state.menu.left
			shouldStateUpdate = true
		}
		if (shouldStateUpdate === true) {
			this.setState(stateUpdate)
		}
	}

	setMenuVisibility(e) {
		e.stopPropagation()
		this.props.toggleHeaderMenu()
	}

	render() {
		return (
			<Menu fixed="top" inverted>
				<Container>
					<Icon
						link
						name={this.state.menu.left ? 'close' : 'sidebar'}
						inverted
						size="huge"
						onClick={event => this.setMenuVisibility(event)}
					/>
					<Menu.Item as="a" header>
						<Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
						Project Name
					</Menu.Item>
					<Menu.Item as="a">Home</Menu.Item>

					<Dropdown item simple text="Dropdown">
						<Dropdown.Menu>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Header>Header Item</Dropdown.Header>
							<Dropdown.Item>
								<i className="dropdown icon" />
								<span className="text">Submenu</span>
								<Dropdown.Menu>
									<Dropdown.Item>List Item</Dropdown.Item>
									<Dropdown.Item>List Item</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown.Item>
							<Dropdown.Item>List Item</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Container>
			</Menu>
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
)(TopMenu)
