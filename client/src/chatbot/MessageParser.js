import axios from 'axios'

class MessageParser {
	constructor(actionProvider, state) {
		this.actionProvider = actionProvider
		this.state = state
	}

	async parse(message) {
		const lowercaseMsg = message.toLowerCase()

		const keyword = handleTestMsg(lowercaseMsg)

		if (keyword === '') {
			return this.actionProvider.handleAnswer('Vui lòng nhập từ khóa!')
		}

		try {
			const { data } = await axios.get(`/api/chatbot/ask/${keyword}`)

			if (data.errorMsg) {
				return this.actionProvider.handleAnswer(data.errorMsg)
			}

			if (data.msg) {
				return this.actionProvider.handleAnswer(data.msg)
			} else {
				this.actionProvider.handleServerError()
			}
		} catch (error) {
			console.log(error)
			this.actionProvider.hadnleServerError()
		}
	}
}

export default MessageParser

const handleTestMsg = (msg = '') => {
	const listRegex = [
		{
			regex: /\w+ là gì/i,
			getKeyword: function (msg) {
				const keyword = msg.slice(0, msg.match(/là gì/i).index)
				return keyword
			},
		},
		{
			regex: /\w+ \?/,
			getKeyword: function (msg) {
				const keyword = msg.slice(0, msg.match(/\?/).index)
				return keyword
			},
		},
		{
			regex: /định nghĩa/i,
			getKeyword: function (msg) {
				const keyword = msg.replace(/định nghĩa/i, '')
				return keyword
			},
		},
	]

	let keyword = ''

	listRegex.find((item) => {
		if (item.regex.test(msg)) {
			keyword = item.getKeyword(msg)
			return true
		}
	})

	if (keyword !== '') {
		return keyword.trim()
	}

	return msg
}
