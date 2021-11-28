const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
	email: {
		type: Schema.Types.String,
	},
	password: {
		type: Schema.Types.String,
	},
	roles: [
		{
			type: Schema.Types.String,
		},
	],
})

const User = mongoose.model('User', UserSchema)
module.exports = User
