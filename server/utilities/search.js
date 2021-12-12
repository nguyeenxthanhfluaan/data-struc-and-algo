const mongoose = require('mongoose')
const Post = require('../models/Post')
const ObjectId = mongoose.Types.ObjectId

const handleSortString = (sortBy) => {
	const timeField = 'lastModified'
	const viewField = 'viewCount'
	// score field is added by $addField stage
	const scoreField = 'score'

	let result = { field: '', direction: '' }

	switch (sortBy) {
		case 'newest':
			result.field = timeField
			result.direction = -1 // -1 mean desc
			break
		case 'oldest':
			result.field = timeField
			result.direction = 1 // 1 mean asc
			break
		case 'mostViewed':
			result.field = viewField
			result.direction = -1
			break
		case 'relevant':
			result.field = scoreField
			result.direction = -1
			break
	}
	return result
}

const search = async ({ keyword, subject, type, category, sort }) => {
	let aggregateQuery = []

	let $match = {}

	const sortObj = handleSortString(sort)

	if (keyword) {
		aggregateQuery.push({
			$search: {
				index: 'searchPosts',
				text: {
					query: keyword,
					path: {
						wildcard: '*',
					},
					fuzzy: {},
				},
			},
		})
		aggregateQuery.push({
			$addFields: { score: { $meta: 'searchScore' } },
		})
	}

	aggregateQuery.push({
		$lookup: {
			from: 'subjects',
			localField: 'subject',
			foreignField: '_id',
			as: 'subject',
		},
	})
	aggregateQuery.push({
		$lookup: {
			from: 'categories',
			localField: 'subject.category',
			foreignField: '_id',
			as: 'category',
		},
	})
	aggregateQuery.push({
		$lookup: {
			from: 'types',
			localField: 'type',
			foreignField: '_id',
			as: 'type',
		},
	})

	aggregateQuery.push({ $unwind: '$subject' })
	aggregateQuery.push({ $unwind: '$category' })
	aggregateQuery.push({ $unwind: '$type' })

	if (category) {
		Object.assign($match, {
			'category._id': ObjectId(category),
		})
	}
	if (subject) {
		Object.assign($match, {
			'subject._id': ObjectId(subject),
		})
	}
	if (type) {
		Object.assign($match, {
			'type._id': ObjectId(type),
		})
	}

	if (Object.keys($match).length > 0) {
		aggregateQuery.push({ $match })
	}

	if (sortObj.field) {
		aggregateQuery.push({
			$sort: { [sortObj.field]: sortObj.direction },
		})
	}

	aggregateQuery.push({
		$project: {
			content: 0,
		},
	})

	try {
		return await Post.aggregate(aggregateQuery)
	} catch (error) {
		throw error
	}
}

module.exports = search
