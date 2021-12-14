const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')
const User = require('../models/User')

const maxAge = 3 * 24 * 60 * 60

// @route   GET api/auth
// @desc    Get user
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const result = await User.findById(req.user)
		res.json(result)
	} catch (error) {
		console.log(error)
	}
})

// @route   GET api/auth/logout
// @desc    Get user
// @access  Private
router.get('/logout', auth, async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 1 })
		res.json('logout success')
	} catch (error) {
		console.log(error)
	}
})

// @route   POST api/auth
// @desc    Login
// @access  Public
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
			res.status(400).send('Bad Data')

		try {
			const user = await User.findOne({ email })
			if (!user || user.password !== password) {
				res.status(400).send('Bad Data')
			}

			const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
				expiresIn: maxAge,
			})

			res.cookie('jwt', token, {
				httpOnly: true,
				secure: true,
				maxAge: maxAge * 1000,
			})
			res.json(user)
		} catch (error) {
			console.log(error)
		}
	} catch (error) {
		console.log(error)
		res.status(500).send('server error')
	}
})

module.exports = router
