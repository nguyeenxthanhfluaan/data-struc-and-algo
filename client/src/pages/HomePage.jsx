import React from 'react'

import InfinityList from '../components/InfinityPostList'

const Homepage = () => {
	return (
		<div className='homepage'>
			<InfinityList title='Bài viết mới nhất' limit={5} />
		</div>
	)
}

export default Homepage
