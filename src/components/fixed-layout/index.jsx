import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../predictable-state-container/actions/retrieve-data'
import { areArraysEqual } from '../../helpers/arrays-are-equal'
import { timeStamp } from '../../helpers/time-stamp'
import { Button, Container, Header, Label, Table } from 'semantic-ui-react'
import TopMenu from './top-menu'
import './custom.css'

class FixedMenuLayout extends React.Component {
	state = {
		list: [],
		race: [],
		detail: false,
		elapsed: 0
	}

	constructor(props) {
		super(props)

		this.getRace = this.getRace.bind(this)
		this.setDisplay = this.setDisplay.bind(this)
		this.tick = this.tick.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		let stateUpdate = { ...this.state }
		let shouldStateUpdate = false

		if (areArraysEqual(stateUpdate.list, nextProps.state.list) === false) {
			stateUpdate.list = [...nextProps.state.list]
			shouldStateUpdate = true
		}

		if (areArraysEqual(stateUpdate.race, nextProps.state.race) === false) {
			stateUpdate.race = [...nextProps.state.race]
			shouldStateUpdate = true
		}

		if (stateUpdate.detail !== nextProps.state.detail) {
			stateUpdate.detail = nextProps.state.detail
			shouldStateUpdate = true
		}

		if (shouldStateUpdate === true) {
			this.setState(stateUpdate)
		}
	}

	tick() {
		const n = this.state.elapsed
		if (n === 5) {
			this.props.retrieveDataAsync('list', '')
			this.setState({ elapsed: 0 })
		} else {
			this.setState({ elapsed: this.state.elapsed + 1 })
		}
	}

	componentDidMount() {
		this.props.retrieveDataAsync('list', '')
		this.interval = setInterval(this.tick, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	getRace(e, i) {
		e.preventDefault()
		e.stopPropagation()

		this.props.retrieveDataAsync('race', i.id)
	}

	setDisplay(e) {
		e.preventDefault()
		e.stopPropagation()

		this.props.setDataDisplay()
	}

	render() {
		const ListHeader = () => (
			<Table.Row>
				<Table.HeaderCell>Race Name</Table.HeaderCell>
				<Table.HeaderCell>Race Type</Table.HeaderCell>
				<Table.HeaderCell>Race Time</Table.HeaderCell>
				<Table.HeaderCell>Bets Close</Table.HeaderCell>
				<Table.HeaderCell>Location</Table.HeaderCell>
			</Table.Row>
		)

		let rowListCount = -1
		const ListRows = () => {
			const rowContents = this.state.list.map(l => {
				rowListCount++
				if (rowListCount === 0) {
					return (
						<Table.Row key={l.EventID}>
							<Table.Cell>
								<a className="race-link" onClick={event => this.getRace(event, { id: l.EventID })}>
									<Label ribbon>{l.Description}</Label>
								</a>
							</Table.Cell>
							<Table.Cell>{l.RaceType}</Table.Cell>
							<Table.Cell>{timeStamp(l.OutcomeDateTime)}</Table.Cell>
							<Table.Cell>{timeStamp(l.SuspendDateTime)}</Table.Cell>
							<Table.Cell>{l.Meeting}</Table.Cell>
						</Table.Row>
					)
				} else {
					return (
						<Table.Row key={l.EventID}>
							<Table.Cell>
								<a className="race-link" onClick={event => this.getRace(event, { id: l.EventID })}>
									{l.Description}
								</a>
							</Table.Cell>
							<Table.Cell>{l.RaceType}</Table.Cell>
							<Table.Cell>{timeStamp(l.OutcomeDateTime)}</Table.Cell>
							<Table.Cell>{timeStamp(l.SuspendDateTime)}</Table.Cell>
							<Table.Cell>{l.Meeting}</Table.Cell>
						</Table.Row>
					)
				}
			})

			return <Table.Body>{rowContents}</Table.Body>
		}

		const DetailHeader = () => (
			<Table.Row>
				<Table.HeaderCell>Competitor</Table.HeaderCell>
				<Table.HeaderCell>Position</Table.HeaderCell>
			</Table.Row>
		)

		const DetailRows = () => {
			const rowContents = this.state.race.map(l => {
				return (
					<Table.Row key={l.CompetitorID}>
						<Table.Cell>{l.Name}</Table.Cell>
						<Table.Cell>{l.Barrier}</Table.Cell>
					</Table.Row>
				)
			})

			return <Table.Body>{rowContents}</Table.Body>
		}

		if (this.state.detail === false) {
			return (
				<div>
					<TopMenu />
					<Container text style={{ marginTop: '7em' }}>
						<Header as="h1">Next Five Races</Header>
						<Table celled>
							<Table.Header>
								<ListHeader />
							</Table.Header>
							<ListRows />
						</Table>
						<p>&nbsp;</p>
					</Container>
				</div>
			)
		} else {
			return (
				<div>
					<TopMenu />
					<Container text style={{ marginTop: '7em' }}>
						<Header as="h1">Race Details</Header>
						<Table celled>
							<Table.Header>
								<DetailHeader />
							</Table.Header>
							<DetailRows />
						</Table>
						<p>&nbsp;</p>
						<Button floated="right" onClick={event => this.setDisplay(event)}>
							Show Race List
						</Button>
						<p>&nbsp;</p>
					</Container>
				</div>
			)
		}
	}
}

export default connect(
	state => {
		const newProps = {
			state: { ...state.data }
		}

		return newProps
	},
	{ ...actionCreators }
)(FixedMenuLayout)
