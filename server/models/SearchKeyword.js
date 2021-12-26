const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SearchKeywordSchema = mongoose.Schema({
	keyword: {
		type: Schema.Types.String,
	},
	searchCount: {
		type: Schema.Types.Number,
	},
})

const SearchKeyword = mongoose.model('SearchKeyword', SearchKeywordSchema)
module.exports = SearchKeyword
