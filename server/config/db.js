const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

const connectDb = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true })
		console.log('mongodb connecting . . .')
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}

module.exports = connectDb
