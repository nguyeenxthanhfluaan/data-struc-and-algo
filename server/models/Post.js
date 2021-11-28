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
		ref: 'types',
	},
	categories: [
		{
			category: {
				type: Schema.Types.ObjectId,
				ref: 'category',
			},
		},
	],
	subjects: [
		{
			subject: {
				type: Schema.Types.ObjectId,
				ref: 'subject',
			},
		},
	],
	keywords: [
		{
			type: Schema.Types.String,
		},
	],
	lastModified: {
		type: Schema.Types.Date,
		default: Date.now,
	},
})

const Post = mongoose.model('post', PostSchema)
module.exports = Post
