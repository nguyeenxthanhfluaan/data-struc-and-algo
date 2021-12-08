import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPost } from '../redux/post/post.actions'

import Menu from '../components/Menu'

const Homepage = () => {
	const { post } = useSelector(({ post }) => ({ posts: post.posts }))
	const dispatch = useDispatch()

	return <div className='homepage'>Đây là trang chủ</div>
}

export default Homepage
