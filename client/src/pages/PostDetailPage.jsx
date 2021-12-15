import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import {
	clearPosts,
	fetchPostById,
	fetchPosts,
} from '../redux/post/post.actions'

import Highlight from 'react-highlight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEye,
	faHome,
	faChevronRight,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-format-parse'
import RingLoader from 'react-spinners/RingLoader'

import Marginer from '../components/Marginer'
import Menu from '../components/Menu'
import Separate from '../components/Separate'
import PostList from '../components/PostList'

const PostDetailPage = () => {
	const dispatch = useDispatch()
	const { id } = useParams()

	const { post, isLoading, posts } = useSelector(({ post }) => ({
		post: post.post,
		posts: post.posts,
		isLoading: post.isLoadingPost,
	}))

	useEffect(() => {
		dispatch(fetchPostById(id))
		dispatch(clearPosts())
	}, [])

	useEffect(() => {
		if (Object.keys(post).length > 0) {
			dispatch(
				fetchPosts({
					subject: post?.subject?._id,
					keyword: post.title,
					limit: 6,
				})
			)
		}
	}, [post])

	return (
		<>
			<div className='post-detail'>
				<div className='post-detail__menu'>
					<Menu />
				</div>
				<div className='post-detail__content'>
					{isLoading && (
						<div className='post-detail__content-loading'>
							<RingLoader color='#cd3300' size={180} />
						</div>
					)}
					{!isLoading && !post && (
						<div className='post-detail__content-not-found'>
							<FontAwesomeIcon icon={faExclamationCircle} />
							<h3>Xin lỗi, bài viết bạn tìm không tồn tại !</h3>
						</div>
					)}
					{!isLoading && post && (
						<>
							<div className='post-detail__content__header'>
								<div className='post-detail__content__header__path'>
									<Link to={`/`}>
										<FontAwesomeIcon icon={faHome} />
									</Link>{' '}
									<FontAwesomeIcon icon={faChevronRight} />{' '}
									<Link to={`/search?category=${post.category._id}`}>
										{post.category.name}
									</Link>{' '}
									<FontAwesomeIcon icon={faChevronRight} />{' '}
									<Link to={`/search?subject=${post.subject._id}`}>
										{post.subject.name}
									</Link>
								</div>
								<Marginer margin={'10px'} />
								<h3 className='post-detail__content__header__title'>
									{post.title}
								</h3>
								<div className='post-detail__content__header__info'>
									<div className='post-detail__content__header__info__date'>
										<span>
											Chỉnh sửa lần cuối:{' '}
											{format(
												new Date(post.lastModified),
												'DD-MM-YYYY'
											)}
										</span>
									</div>
									<div className='post-detail__content__header__info__view'>
										<FontAwesomeIcon
											className='post-detail__content__header__info__view__icon'
											icon={faEye}
										/>
										<span>{post.viewCount}</span>
									</div>
								</div>
							</div>
							<Separate direction='horizontal' thickness='2px' />
							<Marginer margin='20px' />
							<Highlight innerHTML>{post.content}</Highlight>
						</>
					)}
				</div>
			</div>
			<Marginer margin={'50px'} />
			<PostList
				title='Bài viết liên quan'
				data={posts.filter((item) => item._id !== post._id)}
			/>
		</>
	)
}

export default PostDetailPage
