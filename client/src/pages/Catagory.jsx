import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchPosts } from '../redux/post/post.actions'

import List from '../components/List'

const Catagory = (props) => {
	const dispatch = useDispatch()

	const { id } = useParams()

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	console.log(posts)

	useEffect(() => {
		dispatch(fetchPosts({ category: id }))
	}, [id, dispatch])

	return <List data={posts} />
}

export default Catagory
