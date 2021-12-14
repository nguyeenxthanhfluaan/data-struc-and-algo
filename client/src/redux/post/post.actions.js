import postTypes from './post.type'
import axios from 'axios'
import { nanoid } from 'nanoid/non-secure'

export const SORT_TYPES = {
	NEWEST: 'newest',
	OLDEST: 'oldest',
	MOSTVIEWED: 'mostViewed',
	RELEVANT: 'relevant',
}

export const fetchPosts =
	({
		category = null,
		keyword = null,
		subject = null,
		type = null,
		sort = null,
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_POSTS,
				payload: [],
			})

			const result = await axios.get('/api/post/', {
				params: {
					category,
					keyword,
					subject,
					type,
					sort,
				},
			})
			dispatch({
				type: postTypes.SET_POSTS,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

export const fetchPostById = (id) => async (dispatch) => {
	try {
		const post = await axios.get(`/api/post/${id}`)
		dispatch({ type: postTypes.SET_POST, payload: post.data })
	} catch (error) {
		console.log(error)
		dispatch({ type: postTypes.SET_POST, payload: null })
	}
}

export const fetchSearchSuggestion = (keyword) => async (dispatch) => {
	try {
		const id = nanoid(10)
		dispatch({
			type: postTypes.LOAD_SEARCH_SUGGESTION,
			payload: id,
		})

		if (!keyword) {
			return dispatch({
				type: postTypes.HANDLE_SEARCH_SUGGESTION,
				payload: {
					id,
					data: null,
				},
			})
		}

		const { data } = await axios.get('/api/search-suggestion', {
			params: {
				keyword,
			},
		})

		dispatch({
			type: postTypes.HANDLE_SEARCH_SUGGESTION,
			payload: {
				id,
				data,
			},
		})
	} catch (error) {
		console.log(error)
	}
}
