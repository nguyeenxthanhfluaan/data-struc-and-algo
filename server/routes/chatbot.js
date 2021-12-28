const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const JSSoup = require('jssoup').default
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// @route   GET api/chatbot/ask/:keyword
// @desc    Reply user question about definition
// @access  Public
router.get('/ask/:keyword', async (req, res) => {
	try {
		const { keyword } = req.params

		console.log(keyword)

		const result = await Post.aggregate([
			{
				$search: {
					index: 'autocompleteSearchPosts',
					autocomplete: {
						query: keyword,
						path: 'title',
						tokenOrder: 'sequential',
					},
				},
			},
			{
				$match: {
					type: ObjectId('619c67070f5e81f105debe9d'),
				},
			},
		])

		if (result.length === 0) {
			res.json({
				errorMsg: `Xin lỗi! Không tìm thấy định nghĩa của ${keyword}!`,
			})
		}

		res.json({ msg: result[0].definition })
	} catch (error) {
		res.sendStatus(500)
		console.log(error)
	}
})

module.exports = router
