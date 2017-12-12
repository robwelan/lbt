import { LOAD_DATA_LIST, LOAD_DATA_RACE, TOGGLE_DATA_DISPLAY } from '../actions/retrieve-data'
const initialState = {
	list: [],
	race: [],
	detail: false
}

const data = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DATA_LIST:
			return {
				...state,
				list: [...action.list]
			}
		case LOAD_DATA_RACE:
			return {
				...state,
				race: [...action.race],
				detail: true
			}
		case TOGGLE_DATA_DISPLAY:
			return {
				...state,
				detail: !state.detail
			}
		default:
			return state
	}
}

export { data }
