import postTypes from './post.type'

const initialState = {
	posts: null, // normal value = []
	post: null, // normal value = {}
	isLoadingPost: true,
	isLoadingPosts: true,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
				isLoadingPosts: false,
			}
		case postTypes.SET_POST:
			return {
				...state,
				post: action.payload,
				isLoadingPost: false,
			}
		default:
			return state
	}
}

export default reducer
