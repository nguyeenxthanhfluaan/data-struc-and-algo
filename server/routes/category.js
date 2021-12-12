const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()
const Category = require('../models/Category')
const Subject = require('../models/Subject')

// @route   GET api/category
// @desc    Get all category
// @access  Public
router.get('/', async (req, res) => {
	try {
		const result = await Category.find()
		res.json(result)
	} catch (error) {
		res.send('server error')
	}
})

// @route   GET api/category/:id
// @desc    Get all category
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const result = await Category.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/category
// @desc    Create a new category
// @access  Private
router.post('/', async (req, res) => {
	try {
		const category = new Category({
			name: req.body.name,
		})
		console.log(category)
		// const result = 1
		const result = await category.save()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   PUT api/category/:id
// @desc    Update category
// @access  Private
router.put('/:id', async (req, res) => {
	try {
		const category = await Category.findById(req.params.id)
		category.name = req.body.name
		const result = await category.save()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   DELETE api/category/:id
// @desc    Delete a category
// @access  Private
router.delete('/:id', async (req, res) => {
	try {
		const promise1 = Category.findOneAndDelete({ _id: req.params.id })
		const promise2 = Subject.deleteMany({ category: req.params.id })
		await Promise.all([promise1, promise2])
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// // @route   DELETE api/category/
// // @desc    Delete all categories
// // @access  Private
// router.delete('/', async (req, res) => {
// 	try {
// 		await Category.deleteMany()
// 		res.send('success')
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).send('Server Error')
// 	}
// })

module.exports = router
