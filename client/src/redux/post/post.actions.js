import postTypes from './post.type'
import axios from 'axios'

export const SORT_TYPES = {
	NEWEST: 'NEWEST',
	OLDEST: 'OLDEST',
	MOSTVIEWED: 'MOSTVIEWED',
}

export const fetchPosts =
	({
		category = null,
		keyword = null,
		subject = null,
		type = null,
		sortBy = null,
	}) =>
	async (dispatch) => {
		try {
			dispatch({
				type: postTypes.SET_POSTS,
				payload: [],
			})

			let sort = ''
			let asc = true

			switch (sortBy) {
				case SORT_TYPES.NEWEST:
					sort = 'lastModified'
					asc = false
					break
				case SORT_TYPES.OLDEST:
					sort = 'lastModified'
					asc = true
					break
				case SORT_TYPES.MOSTVIEWED:
					sort = 'lastModified'
					asc = false
					break
			}

			if (keyword) {
				const result = await axios.get('/api/post/search', {
					params: {
						category,
						keyword,
						subject,
						type,
						sort,
						asc,
					},
				})
				dispatch({
					type: postTypes.SET_POSTS,
					payload: result.data,
				})
			} else {
				const result = await axios.get('/api/post', {
					params: {
						category,
						subject,
						type,
						sort,
						asc,
					},
				})
				dispatch({
					type: postTypes.SET_POSTS,
					payload: result.data,
				})
			}
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
