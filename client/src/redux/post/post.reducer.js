import postTypes from './post.type'

const initialState = {
	posts: [],
	isLoadingPosts: false,
	errorLoadPosts: '',
	isLastPage: false,

	post: {},
	isLoadingPost: true,

	searchSuggestion: [],
	isLoadingsearchSuggestion: false,
	searchSuggestionId: '',
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case postTypes.SET_LOADING_POSTS:
			return {
				...state,
				isLoadingPosts: true,
				errorLoadPosts: '',
			}
		case postTypes.APPEND_POSTS:
			return {
				...state,
				isLoadingPosts: false,
				posts: [...state.posts, ...action.payload],
				errorLoadPosts: '',
				isLastPage: false,
			}
		case postTypes.SET_POSTS:
			return {
				...state,
				posts: action.payload,
				isLoadingPosts: false,
				errorLoadPosts: '',
				isLastPage: false,
			}
		case postTypes.SET_LAST_PAGE:
			return {
				...state,
				isLoadingPosts: false,
				isLastPage: true,
			}
		case postTypes.SET_ERROR_LOAD_POSTS:
			return {
				...state,
				isLoadingPosts: false,
				isLastPage: false,
				errorLoadPosts: 'Lỗi tải trang',
			}
		case postTypes.CLEAR_POSTS:
			return {
				...state,
				posts: [],
				isLoadingPosts: false,
				errorLoadPosts: '',
				isLastPage: false,
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
