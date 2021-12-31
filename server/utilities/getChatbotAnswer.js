function getChatbotAnswer({ keyword, result }) {
	if (result && result.length > 0) {
		return result.find((item) => {
			const re = new RegExp(`${keyword}`, 'is')
			return re.test(item.title)
		})
	}
}

module.exports = getChatbotAnswer
