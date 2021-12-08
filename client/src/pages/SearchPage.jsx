import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'

import { fetchPosts } from '../redux/post/post.actions'

const SearchPage = () => {
	const dispatch = useDispatch()

	const { keyword } = useParams()

	const [newKeyWord, setNewKeyWord] = useState('')

	const [category, setCategory] = useState('')

	const [subject, setSubject] = useState('')

	const [type, setType] = useState('')

	const [sortBy, setSortBy] = useState('')

	const { posts, categories, subjects, types } = useSelector(
		({ post, category, subject, type }) => ({
			posts: post.posts,
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
		})
	)

	useEffect(() => {
		dispatch(fetchPosts({ keyword }))
	}, [keyword])

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(
			fetchPosts({ keyword: newKeyWord, category, subject, sortBy, type })
		)

		console.log({ newKeyWord })
		console.log({ category })
		console.log({ subject })
		console.log({ sortBy })
		console.log({ type })
	}

	return (
		<div className='search'>
			<div className='search__filter'>
				<input
					type='text'
					placeholder='Nhập để tìm kiếm'
					value={newKeyWord}
					onChange={(e) => setNewKeyWord(e.target.value)}
				/>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value=''>Chọn category</option>
					{categories &&
						categories.length > 0 &&
						categories.map((item) => (
							<option value={item._id}>{item.name}</option>
						))}
				</select>
				<select
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				>
					<option value=''>Chọn subject</option>
					{subjects &&
						subjects.length > 0 &&
						subjects.map((item) => (
							<option value={item._id}>{item.name}</option>
						))}
				</select>
				<select value={type} onChange={(e) => setType(e.target.value)}>
					<option value=''>Chọn type</option>
					{types &&
						types.length > 0 &&
						types.map((item) => (
							<option value={item._id}>{item.name}</option>
						))}
				</select>
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value=''>Sắp xếp theo</option>
					<option value='mostViewed'>Xem nhiều nhất</option>
					<option value='newest'>Mới nhất</option>
					<option value='oldest'>Cũ nhất</option>
				</select>
				<button onClick={handleSubmit}>Áp dụng</button>
			</div>
			{posts &&
				posts.length > 0 &&
				posts.map((post) => <PostCard key={post._id} post={post} />)}
		</div>
	)
}

export default SearchPage
