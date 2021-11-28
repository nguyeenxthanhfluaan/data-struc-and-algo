const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TypeSchema = mongoose.Schema({
	name: {
		type: Schema.Types.String
	}
})

const Type = mongoose.model('Type', TypeSchema)
module.exports = Type
