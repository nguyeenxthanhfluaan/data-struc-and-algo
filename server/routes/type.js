const express = require('express')
const router = express.Router()
const Type = require('../models/Type')

// @route   GET api/type
// @desc    Get all types
// @access  Public
router.get('/', async (req, res) => {
	try {
		const result = await Type.find()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   GET api/type/:id
// @desc    Get type by id
// @access  Public
router.get('/:id', async (req, res) => {
	try {
		const result = await Type.findById(req.params.id)
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// @route   POST api/type
// @desc    Create a new type
// @access  Private
router.post('/', async (req, res) => {
	try {
		const type = new Type({
			name: req.body.name,
		})
		const result = await type.save()
		res.json(result)
	} catch (error) {
		res.send(error)
	}
})

// // @route   DELETE api/type/:id
// // @desc    Delete a type by id
// // @access  Private
router.delete('/:id', async (req, res) => {
	try {
		const type = await Type.findByIdAndDelete(req.params.id)
		res.json(type)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
