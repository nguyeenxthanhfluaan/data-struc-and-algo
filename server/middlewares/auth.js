const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	const token = req.cookies.jwt

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, 'mysecret')
		req.user = decoded.user
		next()
	} catch (err) {
		console.log(err)
		res.clearCookie('jwt')
		return res.status(401).json({ msg: 'Token is not valid' })
	}
}
