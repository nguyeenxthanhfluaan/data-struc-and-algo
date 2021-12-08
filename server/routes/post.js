const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const search = require('../utilities/search')

const mongoose = require('mongoose')
const Post = require('../models/Post')
const Type = require('../models/Type')
const Category = require('../models/Category')
const Subject = require('../models/Subject')
const ObjectId = mongoose.Types.ObjectId

router.get('/test', async (req, res) => {
	try {
		const result = await Post.aggregate([
			{
				$lookup: {
					from: 'subjects',
					localField: 'subject',
					foreignField: '_id',
					as: 'subject',
				},
			},
			{
				$lookup: {
					from: 'categories',
					localField: 'subject.category',
					foreignField: '_id',
					as: 'category',
				},
			},
			// {
			// 	$match: { subject: { _id: '619afefe7c6f64f491368199' } },
			// },
		])
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/post?category=algorithm&keyword=test
// @desc    Search posts if no keyword
// @access  Public
router.get('/', async (req, res) => {
	try {
		const { category, type, subject, sort, asc } = req.query

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

		if (sort) {
			result = await Post.find(query)
				.populate({ path: 'type' })
				.populate({ path: 'category' })
				.populate({ path: 'subject' })
				.sort({ [sort]: asc === 'true' ? 1 : -1 })
		} else {
			result = await Post.find(query)
				.populate({ path: 'type' })
				.populate({ path: 'category' })
				.populate({ path: 'subject' })
		}
		res.json(result)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   GET api/post/search?keyword=123
// @desc    Search posts if keyword exist
// @access  Public
router.get('/search', async (req, res) => {
	const { keyword, subject, type, category, sort, asc } = req.query

	console.log(req.query)

	let $match = {}

	if (category) {
		$match.category = {
			$elemMatch: { _id: ObjectId(category) },
		}
	}
	if (subject) {
		$match.subject = {
			$elemMatch: { _id: ObjectId(subject) },
		}
	}
	if (type) {
		$match.type = {
			$elemMatch: { _id: ObjectId(type) },
		}
	}

	try {
		if (sort) {
			const posts = await Post.aggregate([
				{
					$search: {
						index: 'searchPosts',
						text: {
							query: keyword,
							path: {
								wildcard: '*',
							},
							fuzzy: {},
						},
					},
				},
				{
					$lookup: {
						from: 'subjects',
						localField: 'subject',
						foreignField: '_id',
						as: 'subject',
					},
				},
				// lookup is replacement for populate but it add array
				{
					$lookup: {
						from: 'categories',
						localField: 'subject.category',
						foreignField: '_id',
						as: 'category',
					},
				},
				// match category, (category is array)
				{
					$match: $match,
					// {
					// 	category: {
					// 		$elemMatch: { _id: ObjectId('619a5568a380c5799d8dca3a') },
					// 	},
					// 	subject: {
					// 		$elemMatch: { _id: ObjectId('619afefe7c6f64f491368199') },
					// 	},
					// },
				},
				{
					$addFields: { score: { $meta: 'searchScore' } },
				},
				{ $sort: { [sort]: asc === 'true' ? 1 : -1 } },
			])
			res.json(posts)
		} else {
			const posts = await Post.aggregate([
				{
					$search: {
						index: 'searchPosts',
						text: {
							query: keyword,
							path: {
								wildcard: '*',
							},
							fuzzy: {},
						},
					},
				},
				// lookup is replacement for populate but it add array
				{
					$lookup: {
						from: 'categories',
						localField: 'subject.category',
						foreignField: '_id',
						as: 'category',
					},
				},
				{
					$lookup: {
						from: 'subjects',
						localField: 'subject',
						foreignField: '_id',
						as: 'subject',
					},
				},
				{
					$lookup: {
						from: 'types',
						localField: 'type',
						foreignField: '_id',
						as: 'type',
					},
				},
				// match category, (category is array)
				{
					$match: $match,
				},
				{
					$addFields: { score: { $meta: 'searchScore' } },
				},
			])
			res.json(posts)
		}
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
