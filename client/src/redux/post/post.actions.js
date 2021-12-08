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

			let sort = ''
			let asc = true

			switch (sortBy) {
				case 'newest':
					sort = 'lastModified'
					asc = false
					break
				case 'oldest':
					sort = 'lastModified'
					asc = true
					break
				case 'mostViewed':
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
