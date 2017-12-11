import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'

// Import our app specific reducers
import * as reducers from './predictable-state-container/store'

// Import our redux thunk middleware
import ReduxThunk from 'redux-thunk'

//import './index.css';
import 'semantic-ui-css/semantic.min.css'
//import App from './App'
import SidebarLeftPush from './components/left-side-bar'
import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	combineReducers({
		...reducers
	}),
	composeEnhancers(applyMiddleware(/*middleware, */ ReduxThunk))
)

ReactDOM.render(
	<Provider store={store}>
		<SidebarLeftPush />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
