import postTypes from './post.type'

const initialState = {
	posts: null, // normal value = []
	post: null, // normal value = {}
	isLoading: true,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
				isLoading: false,
			}
		case postTypes.SET_POST:
			return {
				...state,
				post: action.payload,
				isLoading: false,
			}
		default:
			return state
	}
}

export default reducer
