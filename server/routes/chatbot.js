const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const JSSoup = require('jssoup').default

// @route   GET api/chatbot
// @desc    Get chatbot/ask/:keyword
// @access  Public
router.get('/ask/:keyword', async (req, res) => {
	try {
		const { keyword } = req.params
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
		])

		if (result.length === 0) {
			res.json({ errorMsg: `Không tìm thấy ${keyword}` })
		}

		let replyMsg = result[0].content
			.replace(/<\/p>/gi, '\n')
			.replace(/(<([^>]+)>)/g, '.')
			.match(/Khái niệm:[^\n]+/gi)[0]
			.replace(/.*Khái niệm:[^\w]*/i, '')
			.replace(/[.]*$/gi, '')

		res.json({ msg: replyMsg })
	} catch (error) {
		res.sendStatus(500)
		console.log(error)
	}
})

module.exports = router
