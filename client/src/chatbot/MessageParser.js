import axios from 'axios'

class MessageParser {
	constructor(actionProvider, state) {
		this.actionProvider = actionProvider
		this.state = state
	}

	async parse(message) {
		const lowercaseMsg = message.toLowerCase()
		const keyword = handleTestMsg(lowercaseMsg)

		console.log(keyword)
		if (keyword === false) {
			return this.actionProvider.handleException()
		}

		if (keyword === 'tên bạn') {
			return this.actionProvider.handleSaidName()
		}

		try {
			const { data } = await axios.get(`/api/chatbot/ask/${keyword}`)

			console.log({ data })

			if (data.errorMsg) {
				return this.actionProvider.handleAsk(data.errorMsg)
			}

			if (data.msg) {
				return this.actionProvider.handleAsk(data.msg)
			} else {
				this.actionProvider.hadnleServerError()
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

	return false
}
