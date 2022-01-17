import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPosts, SORT_TYPES } from '../redux/post/post.actions'

import Chatbot from 'react-chatbot-kit'
import config from '../chatbot/config.js'
import MessageParser from '../chatbot/MessageParser.js'
import ActionProvider from '../chatbot/ActionProvider.js'

import List from '../components/PostList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faTimes } from '@fortawesome/free-solid-svg-icons'

const Homepage = () => {
	const dispatch = useDispatch()

	const [isShowChatbot, setIsShowChatbot] = useState(false)

	const { posts } = useSelector(({ post }) => ({ posts: post.posts }))

	useEffect(() => {
		dispatch(fetchPosts({ limit: 6, sort: SORT_TYPES.NEWEST }))
	}, [])

	return (
		<div className='homepage'>
			<List title='Bài viết mới nhất' data={posts} />
			<div className='homepage__chatbot'>
				{isShowChatbot ? (
					<>
						<Chatbot
							config={config}
							messageParser={MessageParser}
							actionProvider={ActionProvider}
						/>
						<div
							className='homepage__chatbot__close'
							onClick={() => setIsShowChatbot(false)}
						>
							<FontAwesomeIcon icon={faTimes} />
						</div>
					</>
				) : (
					<div
						className='homepage__chatbot__open'
						onClick={() => setIsShowChatbot(true)}
					>
						<FontAwesomeIcon icon={faRobot} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Homepage
