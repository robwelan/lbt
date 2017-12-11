const ERROR_TOTAL_AND_COMPLETE = 'ERROR_TOTAL_AND_COMPLETE'
const HIDE_LOADING_SCREEN = 'HIDE_LOADING_SCREEN'
const SHOW_LOADING_SCREEN = 'SHOW_LOADING_SCREEN'

const api_endpoints = {
	proxy_gateway: 'https://cors-anywhere.herokuapp.com/',
	gateway: 'https://www.ladbrokes.com.au',
	list: '/api/feed/racingList',
	runners: '/api/feed/eventRunners'
}

let arrayData = []

const checkStatusCode = async response => {
	/*  Use this line when debugging if you wish:
	 *    console.debug('checkStatusCode', response)
	 */

	if (response.status !== 200) {
		// Create an error
		let error = Error('Received an error response.')

		error.response = response

		if (error.response) {
			try {
				let data = await error.response.json()
				error.data = data
			} catch (e) {}
		}

		return window.Promise.reject(error)
	}
	// Data is good (if we got here)
	return response
}

const isObject = val => {
	if (val === null) {
		return false
	}
	return typeof val === 'function' || typeof val === 'object'
}

const timeAsFormated = () => {
	let sTimeStamp = ''
	const d = new Date()
	const nYear = d.getFullYear()
	const nMonth = d.getMonth() + 1
	const sMonth = nMonth < 10 ? `0${nMonth}` : nMonth.toString()
	const nDay = d.getDate()
	const sDay = nDay < 10 ? `0${nDay}` : nDay.toString()
	const nHours = d.getHours()
	const sHours = nHours < 10 ? `0${nHours}` : nHours.toString()
	const nMinutes = d.getMinutes()
	const sMinutes = nMinutes < 10 ? `0${nMinutes}` : nMinutes.toString()
	const nSeconds = d.getSeconds()
	const sSeconds = nSeconds < 10 ? `0${nSeconds}` : nSeconds.toString()

	sTimeStamp = `${nYear}-${nMonth}-${sDay} ${sHours}:${sMinutes}:${sSeconds}.000000`
	return sTimeStamp
}

const generateArrayFromObject = o => {
	let a = []
	let resAll = []
	let resFive = []

	if (isObject(o) === false) {
		return
	}

	for (var key in o) {
		if (o.hasOwnProperty(key)) {
			a.push(o[key])
		}
	}

	const sTimeCompare = timeAsFormated()

	resAll = a.filter(o => {
		if (o.OutcomeDateTime >= sTimeCompare) {
			if (o.Abandoned === 0) {
				return o
			}
		}
	}).sort((a, b) => {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(a.OutcomeDateTime) - new Date(b.OutcomeDateTime);
	})
	console.log(resAll.length)
	resFive = resAll.slice(0, 5).sort((a, b) => {
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.OutcomeDateTime) - new Date(a.OutcomeDateTime);
	})
	console.log(resFive)
	return arrayData
}

const fetchMe = request => {
	request.headers.set('Accept', 'application/json')
	request.headers.set('Content-Type', 'application/json')

	const handleSuccess = data => {
			/*  Use this line when debugging if you wish:
			 *    console.debug('handleSuccess', data)
			 */
			console.log('handleSuccess', data)
			generateArrayFromObject(data)
			// if (data.status.toUpperCase() === 'OK' && data.code === 200) {
			// 	alert('here')
			// 	return data
			// } else {
			// 	console.debug('handleSuccess (error)', err)
			// 	return window.Promise.reject(data)
			// }
		},
		handleFailure = err => {
			console.debug('handleFailure', err)

			return window.Promise.reject(err)
		}

	return window
		.fetch(request)
		.then(checkStatusCode)
		.then(response => response.json())
		.then(handleSuccess, handleFailure)
}

const startLoading = _ => {
	return {
		type: SHOW_LOADING_SCREEN
	}
}

const endLoading = _ => {
	return {
		type: HIDE_LOADING_SCREEN
	}
}

const showTheWorstError = () => {
	return {
		type: ERROR_TOTAL_AND_COMPLETE
	}
}

const unresolvableError = dispatch => {
	setTimeout(() => {
		dispatch(endLoading())
		dispatch(showTheWorstError())
	}, 1500)
}

const retrieveDataAsync = () => {
	return (dispatch, getState) => {
		const onSuccess = data => {
				let usefulData = data.data
				console.log('hre', data)
				// if (engine.init === true) {
				// 	dispatch(setEngineNode(engine))
				// 	dispatch(setEngineNodeComplete())
				// }

				// if (engine.detail === true) {
				// 	dispatch(setDetail())
				// }
				// if (engine.search === true) {
				// 	dispatch(setEngineSearch(engine))
				// }
				// dispatch(setOffsets(engine))
				// if (engine.action === 'clear_search') {
				// 	dispatch(clearEngineSearch())
				// }
				// if (engine.action === 'clear_detail') {
				// 	dispatch(clearEngineDetail())
				// }
				// setTimeout(() => {
				// 	dispatch(useData(usefulData))
				// 	dispatch(endLoading())
				// }, 150)
				console.log(usefulData)
			},
			onError = err => {
				console.debug('standard error', err)
				//  from here we can test what error was thrown, and handle accordingly
				unresolvableError(dispatch)
			}

		let url = `${api_endpoints.proxy_gateway}${api_endpoints.gateway}${api_endpoints.list}`
		let method = 'GET'

		// if (engine.detail === false) {
		// 	url = `${gateway_at_marvel}${engine.node.endpoint === '' ? endpoint_at_marvel : engine.node.endpoint}?ts=${
		// 		ts
		// 	}&apikey=${marvelKey.public}&hash=${hash}`
		// 	url = `${url}${sOffset}`
		// 	if (engine.search === true) {
		// 		url = `${url}${engine.params}`
		// 	}
		// } else {
		// 	url = `${gateway_at_marvel}${engine.page}?ts=${ts}&apikey=${marvelKey.public}&hash=${hash}`
		// }

		// const defaultMethod = 'GET'

		// if (engine.node.hasOwnProperty('method')) {
		// 	method = engine.node.method
		// } else {
		// 	method = defaultMethod
		// }

		let request = new Request(url, {
			method,
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json', //API doesn't like this line...
				'Accept-Encoding': 'gzip',
				Accept: '*/*'
			})
		})

		dispatch(startLoading())

		return fetchMe(request)
			.then(onSuccess, onError)
			.catch(e => {
				unresolvableError(dispatch)
			})
	}
}

export {
	retrieveDataAsync
}