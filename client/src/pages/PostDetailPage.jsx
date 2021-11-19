import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'

import { fetchPostById, fetchPosts } from '../redux/post/post.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEdit } from '@fortawesome/free-solid-svg-icons'

import Marginer from '../components/Marginer'
import PostCard from '../components/PostCard'
import List from '../components/List'
import Button from '../components/Button'

const PostDetailPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const { id } = useParams()

	const { post, posts } = useSelector(({ post }) => ({
		post: post.post,
		posts: post.posts
	}))

	useEffect(() => {
		dispatch(fetchPostById(id))
		dispatch(fetchPosts({}))
	}, [])

	return (
		<div className='post-detail'>
			{post && Object.keys(post).length > 0 && (
				<div>
					<div className='post-detail__header'>
						<h3 className='post-detail__header__text'>{post.title}</h3>
						<Button
							onClick={() => history.push('/post/update')}
							className='post-detail__header__btn'
						>
							<FontAwesomeIcon icon={faEdit} />
							Sữa bài đăng
						</Button>
					</div>
					<Marginer margin='50px' separate />
					<div
						className='post-detail__content'
						dangerouslySetInnerHTML={{ __html: post.content }}
					></div>
				</div>
			)}
			<Marginer margin='50px' separate />
			<div className='post-detail__related'>
				{posts && posts.length > 0 && (
					<List title='Bài viết liên quan' data={posts} />
				)}
			</div>
		</div>
	)
}

export default PostDetailPage