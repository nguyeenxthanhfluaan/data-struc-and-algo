import typeTypes from './type.types'
import axios from 'axios'

export const fetchTypes = () => async (dispatch) => {
	try {
		const result = await axios.get('/api/type')
		dispatch({
			type: typeTypes.SET_TYPES,
			payload: result.data
		})
	} catch (error) {
		console.log(error)
	}
}
