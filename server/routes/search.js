const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Type = require('../models/Type')
const Category = require('../models/Category')
const Subject = require('../models/Subject')

// @route   GET api/search-suggestion
// @desc    Get list of ids which
// @access  Public
router.get('/search-suggestion/', async (req, res) => {
	try {
		const result = await Post.find(
			{
				content: { $regex: `${req.query.keyword}`, $options: 'i' },
			},
			{ _id: 1, content: 1 }
		)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
