import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Highlight from 'react-highlight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEye,
	faHome,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-format-parse'

import { fetchPostById } from '../redux/post/post.actions'

import Marginer from '../components/Marginer'
import Menu from '../components/Menu'
import Separate from '../components/Separate'

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
		<div className='post-detail'>
			<div className='post-detail__menu'>
				<Menu />
			</div>
			{isLoading && <h3>Is loading</h3>}
			{!isLoading && post ? (
				<div className='post-detail__content'>
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
									{format(new Date(post.lastModified), 'DD-MM-YYYY')}
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
				</div>
			) : (
				<h3>Khong6 co post</h3>
			)}
		</div>
	)
}

export default PostDetailPage
