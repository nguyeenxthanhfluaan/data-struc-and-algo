import keywordTypes from './keyword.types'

const initialState = {
	mostSearched: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case keywordTypes.SET_MOST_SEARCHED_KEYWORD:
			return {
				...state,
				mostSearched: action.payload,
			}
		default:
			return state
	}
}

export default reducer
