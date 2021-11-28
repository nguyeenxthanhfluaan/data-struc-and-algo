const express = require('express')
const connectDb = require('./config/db')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const { cloudinary } = require('./config/cloudinary')
const path = require('path')

const app = express()

const upload = multer()

// Connect db
connectDb()

// Translate json
app.use(express.json({ limit: '50mb' }))
// Static file
app.use('/upload', express.static('uploads'))
app.use(cookieParser())

// route
app.use('/api/post', require('./routes/post'))
app.use('/api/category', require('./routes/category'))
app.use('/api/subject', require('./routes/subject'))
app.use('/api/type', require('./routes/type'))
app.use('/api/auth', require('./routes/auth'))

// Upload image for CKEdtitor
app.post('/img/upload', upload.any(), async (req, res) => {
	try {
		const mimetype = req.files[0].mimetype
		const base64Image = req.files[0].buffer.toString('base64')
		const dataURIImage = `data:${mimetype};base64,${base64Image}`

		const uploadRes = await cloudinary.uploader.upload(dataURIImage, {
			upload_preset: 'ml_default',
		})
		res.json({
			uploaded: true,
			url: `${uploadRes.secure_url}`,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// Hosting
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'))
	app.get('*', (req, res) => {
		console.log(__dirname)
		// res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
		res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
	})
}

// listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening at port ${PORT}`))
