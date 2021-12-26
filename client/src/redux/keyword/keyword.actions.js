import axios from 'axios'
import keywordTypes from './keyword.types'

export const fetchMostSearchedKeyword = () => async (dispatch) => {
	try {
		dispatch({
			type: keywordTypes.SET_MOST_SEARCHED_KEYWORD,
			payload: [],
		})
		const result = await axios.get('/api/search-keyword/most-searched')
		dispatch({
			type: keywordTypes.SET_MOST_SEARCHED_KEYWORD,
			payload: result.data,
		})
	} catch (error) {
		console.log(error)
	}
}
