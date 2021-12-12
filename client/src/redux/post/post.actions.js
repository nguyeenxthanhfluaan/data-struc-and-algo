import postTypes from './post.type'
import axios from 'axios'

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
