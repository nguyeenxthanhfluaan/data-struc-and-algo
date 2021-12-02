import subjectTypes from './subject.types'

const initialState = {
	subjects: null, // normal value = []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case subjectTypes.SET_SUBJECT:
			return {
				...state,
				subjects: action.payload,
			}
		// case subjectTypes.ADD_SUBJECT:
		// 	return {
		// 		...state,
		// 		subjects: [...state.subjects, action.payload],
		// 	}
		// case subjectTypes.DELETE_SUBJECT:
		// 	return {
		// 		...state,
		// 		subjects: state.subjects.filter(
		// 			(item) => item._id !== action.payload
		// 		),
		// 	}
		// case subjectTypes.UPDATE_SUBJECT:
		// 	return {
		// 		...state,
		// 		subjects: state.subjects.filter((item) =>
		// 			item._id === action.payload._id ? action.payload : item
		// 		),
		// 	}
		default:
			return state
	}
}

export default reducer
