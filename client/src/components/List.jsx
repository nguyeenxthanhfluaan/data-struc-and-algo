import React from 'react'
import PostCard from './PostCard'

const List = (props) => {
	return (
		<div>
			{props.title && <h3>{props.title}</h3>}
			{props.data &&
				props.data.length > 0 &&
				props.data.map((item) => <PostCard post={item} key={item._id} />)}
		</div>
	)
}

export default List
