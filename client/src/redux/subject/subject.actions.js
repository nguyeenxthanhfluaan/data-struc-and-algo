import axios from 'axios';
import subjectTypes from './subject.types';

export const fetchSubject = () => async (dispatch) => {
  try {
    const result = await axios.get('/api/subject');
    dispatch({
      type: subjectTypes.SET_SUBJECT,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const addSubject =
// 	({ name, category }) =>
// 	async (dispatch) => {
// 		try {
// 			const result = await axios.post('/api/subject', { name, category })
// 			dispatch({
// 				type: subjectTypes.ADD_SUBJECT,
// 				payload: result.data,
// 			})
// 			toast.success('Thêm chủ đề thành công')
// 		} catch (error) {
// 			console.log(error)
// 			toast.error('Thêm chủ đề thất bại')
// 		}
// 	}

// export const deleteSubject =
// 	({ _id }) =>
// 	async (dispatch) => {
// 		try {
// 			await axios.delete(`/api/subject/${_id}`)
// 			toast.success('Xóa chủ đề thành công')
// 			dispatch({
// 				type: subjectTypes.DELETE_SUBJECT,
// 				payload: _id,
// 			})
// 		} catch (error) {
// 			console.log(error)
// 			toast.error('Xóa chủ đề thất bại')
// 		}
// 	}

// export const updateSubject =
// 	({ _id, name }) =>
// 	async (dispatch) => {
// 		try {
// 			const result = await axios.put(`/api/subject/${_id}`, {
// 				name,
// 			})
// 			toast.success('Chỉnh sửa chủ đề thành công')
// 			dispatch({
// 				type: subjectTypes.UPDATE_SUBJECT,
// 				payload: result.data,
// 			})
// 		} catch (error) {
// 			console.log(error)
// 			toast.error('Chỉnh sửa chủ đề thất bại')
// 		}
// 	}
