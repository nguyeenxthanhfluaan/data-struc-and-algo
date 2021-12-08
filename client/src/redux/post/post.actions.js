import postTypes from './post.type'
import axios from 'axios'
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

			const result = await axios.get('/api/post', {
				params: {
					category,
					keyword,
					subject,
					type,
					sortBy,
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
	}
}
