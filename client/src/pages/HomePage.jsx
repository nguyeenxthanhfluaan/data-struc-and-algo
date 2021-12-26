import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPosts, SORT_TYPES } from '../redux/post/post.actions'

import List from '../components/PostList'

const Homepage = () => {
	const dispatch = useDispatch()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	useEffect(() => {
		dispatch(fetchPosts({ limit: 6, sort: SORT_TYPES.NEWEST }))
	}, [])
	return (
		<div className='homepage'>
			<List title='Bài viết mới nhất' data={posts} />
		</div>
	)
}

export default Homepage
