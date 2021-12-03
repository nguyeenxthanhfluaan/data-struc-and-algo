import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
	if (!post) {
		return null
	}
	return (
		<div className='post-card'>
			<h4 className='post-card__title'>
				<Link to={`/post/${post._id}`}>{post.title}</Link>
			</h4>
			<p className='post-card__desc'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita!
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis,
				aspernatur! Lorem ipsum dolor sit, amet consectetur adipisicing
				elit. Rem reiciendis consequatur perspiciatis maxime ut esse natus
				aut, facere odit temporibus sit animi? Qui placeat delectus labore
				iu
			</p>
		</div>
	)
}

export default PostCard
