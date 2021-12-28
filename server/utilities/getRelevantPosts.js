function getRelevantPosts({ posts, limit, subject, type, curId }) {
	if (posts && posts.length <= 0) {
		return []
	}

	let temp = []

	temp = posts.filter((item) => {
		if (
			item.subject._id === subject &&
			item.type._id === type &&
			item._id !== curId
		) {
			return true
		}
		return false
	})

	if (temp.length < limit) {
		temp = posts.filter((item) => {
			if (item.subject._id === subject && item._id !== curId) {
				return true
			}
			return false
		})
	}

	if (temp.length < limit) {
		temp = posts.filter((item) => {
			if (item._id.toString() !== curId) {
				return true
			}
			return false
		})
	}

	temp.sort((a, b) => b.score - a.score)

	if (temp.length > limit) {
		temp = temp.slice(0, limit)
	}

	return temp
}

module.exports = getRelevantPosts
