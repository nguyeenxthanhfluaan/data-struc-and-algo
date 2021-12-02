const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const search = require('../utilities/search')
const Type = require('../models/Type')
const Category = require('../models/Category')
const Subject = require('../models/Subject')
const auth = require('../middlewares/auth')

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Get posts with conditions in query string, Get all post if no condition
// @access  Public
router.get('/', async (req, res) => {
	try {
		const { category, type, keyword, subject, sortBy } = req.query
		// console.log(req.query)

		let query = {}

		if (category) {
			query.category = category
		}
		if (subject) {
			query.subject = subject
		}
		if (type) {
			query.type = type
		}

		let result = null

		switch (sortBy) {
			case 'newest':
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'category', model: Category })
					.populate({ path: 'subject', model: Subject })
					.sort({ lastModified: -1 })
				break
			case 'oldest':
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'category', model: Category })
					.populate({ path: 'subject', model: Subject })
					.sort({ lastModified: 1 })
				break
			case 'mostViewed':
				result = await Post.find(query, { _id: 1, viewCount: 1 })
					.populate({ path: 'type', model: Type })
					.populate({ path: 'category', model: Category })
					.populate({ path: 'subject', model: Subject })
					.sort({ viewCount: -1 })
				break
			default:
				result = await Post.find(query)
					.populate({ path: 'type', model: Type })
					.populate({ path: 'category', model: Category })
					.populate({ path: 'subject', model: Subject })
		}

		console.log({ query })

		res.json(search(result, keyword))
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// test
router.get('/search', async (req, res) => {
	try {
		const posts = await Post.aggregate([
			{
				$search: {
					index: 'searchPosts',
					text: {
						query: req.query.keyword,
						path: {
							wildcard: '*',
						},
						fuzzy: {},
					},
				},
			},
			{
				$project: {
					title: 1,
					content: 1,
					score: { $meta: 'searchScore' },
				},
			},
		])
		res.json(posts)
	} catch (error) {
		console.log(error)
	}
})

// @route   GET api/post/:id
// @desc    Get a post by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const result = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$inc: { viewCount: 1 },
			},
			{ new: true }
		)
			.populate({ path: 'type' })
			.populate({ path: 'category' })
			.populate({ path: 'subject' })
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
router.post('/', async (req, res) => {
	try {
		const { title, description, content, category, type, subject, keywords } =
			req.body

		const post = new Post({
			title,
			description,
			content,
			type,
			category,
			subject,
			keywords,
		})
		const result = await post.save()
		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   PUT /api/post
// @desc    Update a post
// @access  Private
router.put('/', async (req, res) => {
	try {
		const {
			_id,
			title,
			description,
			content,
			category,
			type,
			subject,
			keywords,
		} = req.body

		const result = await Post.findOneAndUpdate(
			{ _id },
			{
				title,
				description,
				content,
				category,
				type,
				subject,
				keywords,
				lastModified: Date.now(),
			},
			{ new: true }
		)
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE /api/post/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', async (req, res) => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id)
		res.json(post)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE /api/post/
// @desc    Delete all posts
// @access  Private
router.delete('/', async (req, res) => {
	try {
		await Post.deleteMany()
		res.send('delete all success')
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
