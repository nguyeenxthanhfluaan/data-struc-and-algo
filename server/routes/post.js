const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const search = require('../utilities/search')
const Type = require('../models/Type')
const Category = require('../models/Category')
const Subject = require('../models/Subject')
const auth = require('../middlewares/auth')

router.get('/search-suggestion/', async (req, res) => {
	try {
		const { keyword } = req.query
		console.log({ keyword })
		const result = await Post.find({
			content: { $regex: `${keyword}`, options: 'i' },
		})
			.populate({ path: 'type', model: Type })
			.populate({ path: 'categories.category', model: Category })
			.populate({ path: 'subjects.subject', model: Subject })
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
		console.log(req.params)
	}
})

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Get posts with conditions in query string, Get all post if no condition
// @access  Public
router.get('/', async (req, res) => {
	try {
		const { category, type, keyword, subject, sortBy } = req.query
		console.log(req.query)

		let query = {}

		if (category) {
			console.log('co category')
			query['categories'] = { $elemMatch: { category } }
		}

		if (subject) {
			console.log('co subject')
			query['subjects'] = { $elemMatch: { subject } }
		}

		if (type) {
			console.log('co type')
			query.type = type
		}

		let result = null

		switch (sortBy) {
			case 'newest':
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'categories.category', model: Category })
					.populate({ path: 'subjects.subject', model: Subject })
					.sort({ lastModified: -1 })
				break
			case 'oldest':
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'categories.category', model: Category })
					.populate({ path: 'subjects.subject', model: Subject })
					.sort({ lastModified: 1 })
				break
			default:
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'categories.category', model: Category })
					.populate({ path: 'subjects.subject', model: Subject })
		}

		console.log({ query })

		res.json(search(result, keyword))
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   GET api/post/:id
// @desc    Get a post by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const result = await Post.findById(req.params.id)
			.populate({ path: 'type', model: Type })
			.populate({ path: 'categories.category', model: Category })
			.populate({ path: 'subjects.subject', model: Subject })
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
		console.log(req.params)
	}
})

// @route   POST /api/post
// @desc    Create a post
// @access  Private
router.post('/', auth, async (req, res) => {
	try {
		const {
			title,
			description,
			content,
			categories,
			type,
			subjects,
			keywords,
		} = req.body
		const post = new Post({
			title,
			description,
			content,
			type,
			categories,
			subjects,
			keywords,
		})
		console.log(post)
		const result = await post.save()
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   POST /api/post
// @desc    Update a post
// @access  Private
router.put('/', async (req, res) => {
	try {
		const {
			_id,
			title,
			description,
			content,
			categories,
			type,
			subjects,
			keywords,
		} = req.body

		const result = await Post.findOneAndUpdate(
			{ _id },
			{
				title,
				description,
				content,
				categories,
				type,
				subjects,
				keywords,
				lastModified: Date.now(),
			},
			{ new: true }
		)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

router.delete('/', async (req, res) => {
	try {
		await Post.deleteMany()
		res.send('delete all success')
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

module.exports = router
