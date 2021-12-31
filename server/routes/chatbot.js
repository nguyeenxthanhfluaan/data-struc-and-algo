const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const getChatbotAnswer = require('../utilities/getChatbotAnswer')

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

		const answer = getChatbotAnswer({ keyword, result })

		console.log(answer)

		if (answer) {
			return res.json({ msg: answer.definition })
		} else {
			return res.json({
				errorMsg: `Xin lỗi! Không tìm thấy định nghĩa của ${keyword}!`,
			})
		}
	} catch (error) {
		res.sendStatus(500)
		console.log(error)
	}
})

module.exports = router
