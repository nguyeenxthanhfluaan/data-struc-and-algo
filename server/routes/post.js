const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const mongoose = require('mongoose')
const Post = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId

const search = require('../utilities/search')

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Search posts if no keyword
// @access  Public
router.get('/', async (req, res) => {
	try {
		const { keyword, subject, type, category, sort } = req.query

		console.log({ keyword, subject, type, category, sort })

		const result = await search({ keyword, subject, type, category, sort })

		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
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

		console.log(req.body)

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
