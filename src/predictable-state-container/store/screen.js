import { MENU_VISIBILITY } from '../actions/header-menu'

const initialState = {
	menu: {
		left: false
	}
}

const screen = (state = initialState, action) => {
	switch (action.type) {
		case MENU_VISIBILITY:
			return {
				...state.screen,
				menu: { left: !state.menu.left }
			}
		default:
			return state
	}
}

export { screen }
