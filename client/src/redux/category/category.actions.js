import axios from 'axios'
import categoryTypes from './category.types'

export const fetchCategory = () => async (dispatch) => {
	try {
		const result = await axios.get('/api/category')
		dispatch({
			type: categoryTypes.SET_CATEGORY,
			payload: result.data,
		})
	} catch (error) {
		console.log(error)
	}
}

// export const updateCategory =
// 	({ _id, name }) =>
// 	async (dispatch) => {
// 		try {
// 			const result = await axios.put(`/api/category/${_id}`, {
// 				name,
// 			})
// 			toast.success('Chỉnh sửa danh mục thành công')
// 			dispatch({
// 				type: categoryTypes.UPDATE_CATEGORY,
// 				payload: result.data,
// 			})
// 		} catch (error) {
// 			console.log({ error })
// 			toast.error('Chỉnh sửa danh mục thất bại')
// 		}
// 	}

// export const addCategory =
// 	({ name }) =>
// 	async (dispatch) => {
// 		try {
// 			const result = await axios.post(`/api/category`, {
// 				name,
// 			})
// 			toast.success('Thêm danh mục thành công')
// 			dispatch({
// 				type: categoryTypes.ADD_CATEGORY,
// 				payload: result.data,
// 			})
// 		} catch (error) {
// 			console.log({ error })
// 			toast.error('Thêm danh mục thất bại')
// 		}
// 	}

// export const deleteCategory =
// 	({ _id }) =>
// 	async (dispatch) => {
// 		try {
// 			await axios.delete(`/api/category/${_id}`)
// 			toast.success('Xóa danh mục thành công')
// 			dispatch({
// 				type: categoryTypes.DELETE_CATEGORY,
// 				payload: _id,
// 			})
// 		} catch (error) {
// 			console.log({ error })
// 			toast.error('Xóa danh mục thất bại')
// 		}
// 	}
