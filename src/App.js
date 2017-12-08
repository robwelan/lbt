import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Header } from 'semantic-ui-react'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
				<Header as="h1">First Header</Header>
				<Header as="h2">Second Header</Header>
				<Header as="h3">Third Header</Header>
				<Header as="h4">Fourth Header</Header>
				<Header as="h5">Fifth Header</Header>
				<Header as="h6">Sixth Header</Header>
			</div>
		)
	}
}

export default App
