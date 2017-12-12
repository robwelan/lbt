import { dateTimeStamp } from '../../helpers/time-stamp'
// TODO: more on sreen logic
//const ERROR_TOTAL_AND_COMPLETE = 'ERROR_TOTAL_AND_COMPLETE'
//const HIDE_LOADING_SCREEN = 'HIDE_LOADING_SCREEN'
const SHOW_LOADING_SCREEN = 'SHOW_LOADING_SCREEN'
const LOAD_DATA_LIST = 'LOAD_DATA_LIST'
const LOAD_DATA_RACE = 'LOAD_DATA_RACE'
const TOGGLE_DATA_DISPLAY = 'TOGGLE_DATA_DISPLAY'

const api_endpoints = {
	proxy_gateway: 'https://cors-anywhere.herokuapp.com/',
	gateway: 'http://www.ladbrokes.com.au',
	list: '/api/feed/racingList',
	runners: '/api/feed/eventRunners'
}

const setDataList = data => ({
	type: LOAD_DATA_LIST,
	list: [...data]
})

const setDataRace = data => ({
	type: LOAD_DATA_RACE,
	race: [...data]
})

const toggleDataDisplay = () => ({
	type: TOGGLE_DATA_DISPLAY
})
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

const generateArrayFromSingleObject = o => {
	let a = []
	let oT = {}

	if (isObject(o) === false) {
		return
	}

	for (var key in o) {
		for (var cKey in o[key].competitors) {
			oT = o[key].competitors[cKey]
			oT['CompetitorID'] = cKey
			a.push(oT)
		}
	}

	return a
}

const generateArrayFromListObject = o => {
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

	const sTimeCompare = dateTimeStamp()

	resAll = a
		.filter(o => {
			if (o.SuspendDateTime >= sTimeCompare) {
				if (o.Abandoned === 0) {
					return o
				}
			}
		})
		.sort((a, b) => {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(a.OutcomeDateTime) - new Date(b.OutcomeDateTime)
		})

	resFive = resAll.slice(0, 5)

	const arrayData = [...resFive]
	return arrayData
}

const fetchMe = request => {
	//	request.headers.set('Accept', 'application/json')
	//	request.headers.set('Content-Type', 'application/json')

	const handleSuccess = data => {
			/*  Use this line when debugging if you wish:
			 *    console.debug('handleSuccess', data)
			 */
			// TODO: check for errors
			return data
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
		.catch(err => {
			// TODO: something better
			console.debug('abjectFailure', err)
		})
}

const startLoading = _ => {
	return {
		type: SHOW_LOADING_SCREEN
	}
}
// TODO: for later
// const endLoading = _ => {
// 	return {
// 		type: HIDE_LOADING_SCREEN
// 	}
// }

// const showTheWorstError = () => {
// 	return {
// 		type: ERROR_TOTAL_AND_COMPLETE
// 	}
// }

const unresolvableError = dispatch => {
	// TODO: finish
	//	setTimeout(() => {
	//		dispatch(endLoading())
	//		dispatch(showTheWorstError())
	//	}, 1500)
}

const setDataDisplay = () => {
	return (dispatch, getState) => {
		dispatch(toggleDataDisplay())
	}
}
const retrieveDataAsync = (sType, sID) => {
	return (dispatch, getState) => {
		const onSuccess = data => {
				let usefulData = data

				if (usefulData === 'undefined') {
					// TODO: error handling, probably a bad gateway issue
				}
				switch (sType) {
					case 'list':
						dispatch(setDataList(generateArrayFromListObject(usefulData)))
						break
					case 'race':
						dispatch(setDataRace(generateArrayFromSingleObject(usefulData)))
						break
					default:
					// do nothing: this should have been trapped previously
				}
			},
			onError = err => {
				console.debug('standard error', err)
				//  from here we can test what error was thrown, and handle accordingly
				unresolvableError(dispatch)
			}

		let method = 'GET'

		let url = ''
		switch (sType) {
			case 'list':
				url = `${api_endpoints.proxy_gateway}${api_endpoints.gateway}${api_endpoints.list}`
				break
			case 'race':
				if (sID === '') {
					// TODO: return error
				}
				url = `${api_endpoints.proxy_gateway}${api_endpoints.gateway}${
					api_endpoints.runners
				}?event_id=${sID.toString()}`
				break
			default:
			// TODO: return an error
		}

		let request = new Request(url, {
			method,
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json', //API doesn't like this line...
				'Accept-Encoding': 'gzip',
				Accept: '*/*',
				'X-Requested-With': 'XMLHttpRequest'
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

export { retrieveDataAsync, setDataDisplay }
export { LOAD_DATA_LIST, LOAD_DATA_RACE, TOGGLE_DATA_DISPLAY }
