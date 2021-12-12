import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import List from '../components/List'
import Marginer from '../components/Marginer'

import { fetchPosts, SORT_TYPES } from '../redux/post/post.actions'

const SearchPage = () => {
	const dispatch = useDispatch()

	const { search } = useLocation()

	const params = new URLSearchParams(search)

	const [keyword, setKeyword] = useState('')

	const [category, setCategory] = useState('')

	const [subject, setSubject] = useState('')

	const [type, setType] = useState('')

	const [sort, setSort] = useState('')

	const { posts, categories, subjects, types } = useSelector(
		({ post, category, subject, type }) => ({
			posts: post.posts,
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
		})
	)

	useEffect(() => {
		if (params.get('keyword')) {
			setKeyword(params.get('keyword'))
		}
		if (params.get('category')) {
			setCategory(params.get('category'))
		}
		if (params.get('subject')) {
			setSubject(params.get('subject'))
		}

		dispatch(
			fetchPosts({
				keyword: params.get('keyword'),
				category: params.get('category'),
				subject: params.get('subject'),
			})
		)
	}, [search])

	const handleSubmit = (e) => {
		e.preventDefault()

		dispatch(fetchPosts({ keyword, category, subject, sort, type }))
	}

	return (
		<div className='search'>
			<div className='search__filter'>
				<input
					type='text'
					placeholder='Nhập để tìm kiếm'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value=''>Chọn category</option>
					{categories &&
						categories.length > 0 &&
						categories.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
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
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
				</select>
				<select value={type} onChange={(e) => setType(e.target.value)}>
					<option value=''>Chọn type</option>
					{types &&
						types.length > 0 &&
						types.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
				</select>
				<select value={sort} onChange={(e) => setSort(e.target.value)}>
					<option value=''>Sắp xếp theo</option>
					<option value={SORT_TYPES.RELEVANT}>Liên quan nhất</option>
					<option value={SORT_TYPES.MOSTVIEWED}>Xem nhiều nhất</option>
					<option value={SORT_TYPES.NEWEST}>Mới nhất</option>
					<option value={SORT_TYPES.OLDEST}>Cũ nhất</option>
				</select>
				<button onClick={handleSubmit}>Áp dụng</button>
			</div>
			<Marginer margin={'20px'} />
			{posts && posts.length > 0 && (
				<List
					title={
						keyword
							? `Kết quả tìm kiếm của <q>${keyword}</q>`
							: 'Danh sách bài viết'
					}
					data={posts}
				/>
			)}
		</div>
	)
}

export default SearchPage
