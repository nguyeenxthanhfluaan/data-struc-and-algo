import React from 'react'
import Marginer from './Marginer'
import PostCard from './PostCard'

const List = ({ title, data }) => {
	return (
		<div className='list'>
			{title && (
				<h3
					className='list__title'
					dangerouslySetInnerHTML={{ __html: title }}
				></h3>
			)}
			{title && <Marginer margin='30px' />}
			<div className='list__wrapper'>
				{data &&
					data.length > 0 &&
					data.map((item) => <PostCard post={item} key={item._id} />)}
			</div>
		</div>
	)
}

export default List
