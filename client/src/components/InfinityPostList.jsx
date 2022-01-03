import React, { useEffect, useState, useRef, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { appendPosts, fetchPosts } from '../redux/post/post.actions'
import FadeLoader from 'react-spinners/FadeLoader'

import List from './PostList'

const InfinityList = ({ limit, filter, title }) => {
	const dispatch = useDispatch()

	const listRef = useRef(null)

	const { keyword, category, subject, sort, type } = filter

	const [page, setPage] = useState(1)

	const [load, setLoad] = useState(false)

	const { posts, isLoadingPosts, errorLoadPosts, isLastPage } = useSelector(
		({ post }) => ({
			posts: post.posts,
			isLoadingPosts: post.isLoadingPosts,
			errorLoadPosts: post.errorLoadPosts,
			isLastPage: post.isLastPage,
		})
	)

	useEffect(() => {
		dispatch(fetchPosts({ limit, keyword, category, subject, sort, type }))
		setLoad(false)
		setPage(1)
	}, [filter])

	// When there was error, reduce page by 1, because when
	// fetching posts, we have increased it
	useEffect(() => {
		if (isLoadingPosts === false && errorLoadPosts) {
			setPage(page - 1)
			console.log('loi error')
		}
	}, [isLoadingPosts, errorLoadPosts])

	useEffect(() => {
		if (load && !errorLoadPosts && !isLastPage) {
			dispatch(
				appendPosts({
					skip: page * limit,
					limit,
					keyword,
					category,
					subject,
					sort,
					type,
				})
			)
			setPage(page + 1)
			setLoad(false)
		}
	}, [load])

	// add event listener to fetch data when reach bottom
	useEffect(() => {
		const loadData = () => {
			if (listRef && listRef.current) {
				if (
					window.scrollY + window.innerHeight >=
					listRef.current.offsetTop + listRef.current.clientHeight + 100
				) {
					setLoad(true)
				}
			}
		}
		window.addEventListener('scroll', loadData)
		return () => {
			window.removeEventListener('scroll', loadData)
		}
	}, [])

	return (
		<div ref={listRef} className='infinity-list'>
			<List data={posts} title={title} />
			{isLoadingPosts && (
				<div className='infinity-list__loading'>
					<FadeLoader color='#cd3300' />
				</div>
			)}
			{!isLoadingPosts && errorLoadPosts && (
				<div className='infinity-list__error'>
					<p className='infinity-list__error__title'>
						Có lỗi xảy ra, vui lòng tải lại trang
					</p>
				</div>
			)}
		</div>
	)
}

InfinityList.displayName = InfinityList.name

export default memo(InfinityList)
