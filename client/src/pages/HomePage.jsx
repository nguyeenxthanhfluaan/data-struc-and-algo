import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost, fetchPosts, SORT_TYPES } from '../redux/post/post.actions'

import Menu from '../components/Menu'
import List from '../components/List'
import Marginer from '../components/Marginer'

const Homepage = () => {
	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts({ sortBy: SORT_TYPES.NEWEST }))
	}, [])

	return (
		<div className='homepage'>
			<Marginer margin='30px' />
			<List title='Bài viết mới' data={posts} />
		</div>
	)
}

export default Homepage
