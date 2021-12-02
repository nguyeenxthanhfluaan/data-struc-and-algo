import typeTypes from './type.types'

const initialState = {
	types: null, // normal value = []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case typeTypes.SET_TYPES:
			return {
				...state,
				types: action.payload,
			}
		default:
			return state
	}
}

export default reducer
