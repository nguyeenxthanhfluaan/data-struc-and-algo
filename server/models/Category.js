const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = mongoose.Schema({
	name: {
		type: Schema.Types.String,
	},
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category
