import React from 'react'
import { Link } from 'react-router-dom'

import img from '../assets/images/hero.png'

import { parse, format } from 'date-format-parse'

const PostCard = ({ post }) => {
	if (!post) {
		return null
	}

	return (
		<div className='post-card'>
			<div className='post-card__thumb'>
				<Link to={`/post/${post._id}`}>
					<img src={img} alt='' />
				</Link>
			</div>
			<div className='post-card__header'>
				<Link to={`/post/${post._id}`}>
					<h4 className='post-card__header__title'>{post.title}</h4>
				</Link>
				<time className='post-card__header__date'>
					{format(new Date(post.lastModified), 'DD-MM-YYYY')}{' '}
				</time>
			</div>
			<p className='post-card__desc'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita!
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis,
				aspernatur! Lorem ipsum dolor sit, amet consectetur adipisicing
				elit. Rem reiciendis consequatur perspiciatis maxime ut esse natus
				aut, facere odit temporibus sit animi? Qui placeat delectus labore
				iu Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
				nemo distinctio fugiat est explicabo saepe amet enim iste voluptatem
				veniam Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Nulla ut recusandae sapiente quam quasi, quo culpa eum excepturi
				assumenda soluta?
			</p>
		</div>
	)
}

export default PostCard
