import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import InfinityList from '../components/InfinityPostList'

import Marginer from '../components/Marginer'

import { SORT_TYPES } from '../redux/post/post.actions'

const SearchPage = () => {
	const { search } = useLocation()

	const params = new URLSearchParams(search)

	const [title, setTitle] = useState('')

	const [keyword, setKeyword] = useState('')

	const [category, setCategory] = useState('')

	const [subject, setSubject] = useState('')

	const [type, setType] = useState('')

	const [sort, setSort] = useState('')

	const [filter, setFilter] = useState({})

	const { categories, subjects, types } = useSelector(
		({ post, category, subject, type }) => ({
			posts: post.posts,
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
		})
	)

	useEffect(() => {
		const paramsKeyword = params.get('keyword')
		const paramsCategory = params.get('category')
		const paramsSubject = params.get('subject')

		const initialFilter = {}

		if (paramsKeyword) {
			setKeyword(paramsKeyword)
			setTitle(paramsKeyword)
			initialFilter.keyword = paramsKeyword
		}
		if (paramsCategory) {
			setCategory(paramsCategory)
			initialFilter.category = paramsCategory
		}
		if (paramsSubject) {
			setSubject(paramsSubject)
			initialFilter.subject = paramsSubject
		}

		setSort(SORT_TYPES.NEWEST)
		initialFilter.sort = SORT_TYPES.NEWEST

		setFilter(initialFilter)
	}, [search])

	const handleSubmit = (e) => {
		e.preventDefault()
		setTitle(keyword)
		setFilter({
			category,
			subject,
			keyword,
			type,
			sort,
		})
	}

	return (
		<div className='search'>
			<form className='search__filter' onSubmit={handleSubmit}>
				<input
					type='text'
					value={keyword}
					className='search__filter__input'
					placeholder='Nhập để tìm kiếm'
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<select
					value={category}
					className='search__filter__select'
					onChange={(e) => {
						setCategory(e.target.value)
						setSubject('')
					}}
				>
					<option value=''>Chọn danh mục</option>
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
					className='search__filter__select'
					onChange={(e) => setSubject(e.target.value)}
				>
					<option value=''>Chọn chủ đề</option>
					{subjects &&
						subjects.length > 0 &&
						subjects.map((item) =>
							item.category._id === category ? (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							) : null
						)}
				</select>
				<select
					value={type}
					className='search__filter__select'
					onChange={(e) => setType(e.target.value)}
				>
					<option value=''>Chọn loại</option>
					{types &&
						types.length > 0 &&
						types.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
				</select>
				<select
					value={sort}
					className='search__filter__select'
					onChange={(e) => setSort(e.target.value)}
				>
					<option value=''>Sắp xếp theo</option>
					{keyword && (
						<option value={SORT_TYPES.RELEVANT}>Liên quan nhất</option>
					)}
					<option value={SORT_TYPES.MOSTVIEWED}>Xem nhiều nhất</option>
					<option value={SORT_TYPES.NEWEST}>Mới nhất</option>
					<option value={SORT_TYPES.OLDEST}>Cũ nhất</option>
				</select>
				<button type='submit' className='search__filter__btn'>
					Áp dụng
				</button>
			</form>
			<Marginer margin={'20px'} />

			{
				<InfinityList
					limit={5}
					filter={filter}
					title={
						title
							? `Kết quả tìm kiếm của <q>${title}</q>`
							: 'Danh sách bài viết'
					}
				/>
			}
		</div>
	)
}

export default SearchPage
