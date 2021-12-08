import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { fetchPostById } from '../redux/post/post.actions'

import Marginer from '../components/Marginer'
import Menu from '../components/Menu'

const PostDetailPage = () => {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { post, isLoading } = useSelector(({ post }) => ({
		post: post.post,
		isLoading: post.isLoadingPost,
	}))

	useEffect(() => {
		dispatch(fetchPostById(id))
	}, [])

	console.log(post)

	return (
		<>
			<Menu />
			<div style={{ flex: 1 }}>
				<div className='post-detail'>
					{isLoading && <h2>Đang load</h2>}
					{!isLoading && post && (
						<div>
							<h3 className='post-detail__heading'>{post.title}</h3>
							<Marginer margin='20px' />
							<div
								dangerouslySetInnerHTML={{ __html: post.content }}
							></div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default PostDetailPage
