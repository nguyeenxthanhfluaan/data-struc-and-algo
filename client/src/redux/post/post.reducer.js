import postTypes from './post.type'

const initialState = {
	posts: null, // normal value = []
	isLoadingPosts: true,

	post: null, // normal value = {}
	isLoadingPost: true,

	searchSuggestion: null, // normal value = []
	isLoadingsearchSuggestion: false,
	searchSuggestionId: '',
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
		case postTypes.LOAD_SEARCH_SUGGESTION:
			return {
				...state,
				isLoadingsearchSuggestion: true,
				searchSuggestionId: action.payload,
				searchSuggestion: null,
			}
		case postTypes.HANDLE_SEARCH_SUGGESTION:
			if (state.searchSuggestionId === action.payload.id) {
				return {
					...state,
					isLoadingsearchSuggestion: false,
					searchSuggestion: action.payload.data,
				}
			} else return state

		default:
			return state
	}
}

export default reducer
