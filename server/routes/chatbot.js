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
			.replace(/<\/p.*>/i, '\n')
			.replace(/(<([^>]+)>)/g, '.')
			.match(/Khái niệm:[^$]*/i)[0]
			.replace(/.*Khái niệm:/i, '')

		res.json({ msg: replyMsg })
	} catch (error) {
		res.send(error)
	}
})

module.exports = router
