const express = require('express')
const router = express.Router()
const SearchKeyword = require('../models/SearchKeyword')

// @route   GET api/search-keyword
// @desc    Get user
// @access  Public
router.get('/', async (req, res) => {
	try {
		const result = await SearchKeyword.find()
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/search-keyword/most-searched
// @desc    Get user
// @access  Pulic
router.get('/most-searched', async (req, res) => {
	try {
		const result = await SearchKeyword.find()
			.sort({ searchCount: -1 })
			.limit(10)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
