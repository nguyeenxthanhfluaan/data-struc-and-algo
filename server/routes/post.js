const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const mongoose = require('mongoose')
const Post = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId

const search = require('../utilities/search')
const getRelevantPosts = require('../utilities/getRelevantPosts')

// @route   GET /api/post/relevant
// @desc    Delete a post
// @access  Public
router.get('/relevant', async (req, res) => {
	try {
		const { title, curId, category, subject, type, limit } = req.query

		const posts = await search({
			keyword: title,
			category: category,
			approximate: true,
		})

		res.json(getRelevantPosts({ posts, limit, subject, type, curId }))
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
		const { keyword, subject, type, category, sort, skip, limit } = req.query

		const skipNumber = parseInt(skip)
		const limitNumber = parseInt(limit)

		const result = await search({
			keyword,
			subject,
			type,
			category,
			sort,
			skip: skipNumber,
			limit: limitNumber,
		})

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
		const promise1 = Post.findByIdAndUpdate(req.params.id, {
			$inc: { viewCount: 1 },
		})

		const promise2 = Post.aggregate([
			{
				$match: { _id: ObjectId(req.params.id) },
			},
			{
				$set: { viewCount: { $sum: ['$viewCount', 1] } },
			},
			{
				$lookup: {
					from: 'types',
					localField: 'type',
					foreignField: '_id',
					as: 'type',
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
					from: 'categories',
					localField: 'subject.category',
					foreignField: '_id',
					as: 'category',
				},
			},
			{ $unwind: '$subject' },
			{ $unwind: '$category' },
			{ $unwind: '$type' },
		])

		const values = await Promise.all([promise1, promise2])

		res.json(values[1][0])
	} catch (error) {
		console.log(error)
		res.status(500).send('Server Error')
	}
})

// @route   DELETE /api/post/count?category=&subject=
// @desc    Delete a post
// @access  Private
router.get('/count', async (req, res) => {
	try {
		const { category, subject } = req.query
		let query = {}
		if (category) {
			query.category = category
		}
		if (subject) {
			query.subject = subject
		}
		const count = await Post.find(query).count()
		res.json(count)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// @route   DELETE /api/post/
// @desc    Delete all posts
// @access  Private
// router.delete('/', async (req, res) => {
// 	try {
// 		await Post.deleteMany()
// 		res.send('delete all success')
// 	} catch (error) {
// 		console.log(error)
// 		res.sendStatus(500)
// 	}
// })

module.exports = router
