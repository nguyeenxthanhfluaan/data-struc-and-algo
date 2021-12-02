import categoryTypes from './category.types'

const initialState = {
	categories: null, // normal value is []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case categoryTypes.SET_CATEGORY:
			return {
				...state,
				categories: action.payload,
			}
		// case categoryTypes.UPDATE_CATEGORY:
		// 	console.log(action.payload)
		// 	return {
		// 		...state,
		// 		categories: state.categories.map((item) => {
		// 			const { _id, name } = action.payload
		// 			if (item._id === _id) {
		// 				return {
		// 					...item,
		// 					name,
		// 				}
		// 			}
		// 			return item
		// 		}),
		// 	}
		// case categoryTypes.ADD_CATEGORY:
		// 	return {
		// 		...state,
		// 		categories: [...state.categories, action.payload],
		// 	}
		// case categoryTypes.DELETE_CATEGORY:
		// 	return {
		// 		...state,
		// 		categories: state.categories.filter(
		// 			(item) => item._id !== action.payload
		// 		),
		// 	}
		default:
			return state
	}
}

export default reducer
