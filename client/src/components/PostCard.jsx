import React from 'react'
import { Link } from 'react-router-dom'

import img from '../assets/images/hero.png'

import { parse, format } from 'date-format-parse'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const PostCard = ({ post }) => {
	if (!post) {
		return null
	}

	const handleErrorImg = (e) => {
		e.target.onerror = null
		e.target.src = img
	}

	return (
		<div className='post-card'>
			<div className='post-card__thumb'>
				<Link to={`/post/${post._id}`}>
					<img src={post.thumbnail.url} onError={handleErrorImg} />
				</Link>
			</div>
			<div className='post-card__header'>
				<Link to={`/post/${post._id}`}>
					<h4 className='post-card__header__title'>{post.title}</h4>
				</Link>
				<div className='post-card__header__info'>
					<div className='post-card__header__info__view'>
						<FontAwesomeIcon
							icon={faEye}
							className='post-card__header__info__view__icon'
						/>
						<span>{post.viewCount}</span>
					</div>
					<time className='post-card__header__info__date'>
						{format(new Date(post.lastModified), 'DD-MM-YYYY')}{' '}
					</time>
				</div>
			</div>
			<p className='post-card__desc'>{post.description}</p>
		</div>
	)
}

export default PostCard
