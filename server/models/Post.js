const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
	title: {
		type: Schema.Types.String,
		require: true,
	},
	description: {
		type: Schema.Types.String,
		require: true,
	},
	content: {
		type: Schema.Types.String,
		require: true,
	},
	type: {
		type: Schema.Types.ObjectId,
		ref: 'Type',
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	subject: {
		type: Schema.Types.ObjectId,
		ref: 'Subject',
	},
	keywords: [
		{
			type: Schema.Types.String,
		},
	],
	lastModified: {
		type: Schema.Types.Date,
		default: Date.now,
	},
	viewCount: {
		type: Schema.Types.Number,
		default: 0,
	},
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
