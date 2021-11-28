const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = mongoose.Schema({
	name: {
		type: Schema.Types.String,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
})

const Subject = mongoose.model('Subject', SubjectSchema)
module.exports = Subject
