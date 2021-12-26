import React from 'react'
import Marginer from './Marginer'
import PostCard from './PostCard'

const List = ({ title, data }) => {
	return (
		<div className='post-list'>
			{title && (
				<div className='post-list__title'>
					<h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
				</div>
			)}
			{title && <Marginer margin='30px' />}
			<div className='post-list__wrapper'>
				{data &&
					data.length > 0 &&
					data.map((item) => <PostCard post={item} key={item._id} />)}
			</div>
		</div>
	)
}

export default List
