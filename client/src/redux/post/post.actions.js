import postTypes from './post.types'
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
		skip = null,
		limit = null,
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_POSTS,
				payload: [],
			})
			dispatch({
				type: postTypes.SET_LOADING_POSTS,
			})

			const result = await axios.get('/api/post/', {
				params: {
					category,
					keyword,
					subject,
					type,
					sort,
					skip,
					limit,
				},
			})

			dispatch({
				type: postTypes.SET_POSTS,
				payload: result.data,
			})
		} catch (error) {
			console.log(error)
			dispatch({
				type: postTypes.SET_ERROR_LOAD_POSTS,
			})
		}
	}

export const appendPosts =
	({
		category = null,
		keyword = null,
		subject = null,
		type = null,
		sort = null,
		skip = null,
		limit = null,
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_LOADING_POSTS,
			})

			const { data } = await axios.get('/api/post/', {
				params: {
					category,
					keyword,
					subject,
					type,
					sort,
					skip,
					limit,
				},
			})

			if (data && data.length > 0) {
				dispatch({
					type: postTypes.APPEND_POSTS,
					payload: data,
				})
			} else {
				dispatch({
					type: postTypes.SET_LAST_PAGE,
					payload: data,
				})
			}
		} catch (error) {
			console.log(error)
			dispatch({
				type: postTypes.SET_ERROR_LOAD_POSTS,
			})
		}
	}

export const clearPosts = () => ({
	type: postTypes.CLEAR_POSTS,
})

export const fetchPostById = (id) => async (dispatch) => {
	try {
		dispatch({ type: postTypes.SET_POST, payload: {} })
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

export const fetchRelevantPosts =
	({ title, curId, category, subject, type, limit }) =>
	async (dispatch) => {
		try {
			dispatch({ type: postTypes.CLEAR_POSTS })
			const result = await axios.get('/api/post/relevant', {
				params: {
					title,
					curId,
					category,
					subject,
					type,
					limit,
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
