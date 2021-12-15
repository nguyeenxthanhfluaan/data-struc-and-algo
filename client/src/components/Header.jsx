import React, { useState, useRef, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Logo from '../assets/images/logo.png'

import { fetchSearchSuggestion } from '../redux/post/post.actions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	const dispatch = useDispatch()

	const history = useHistory()

	const searchSuggestionRef = useRef()

	const [keyword, setKeyword] = useState('')

	const { categories, subjects, searchSuggestion, isLoadingsearchSuggestion } =
		useSelector(({ category, subject, post }) => ({
			categories: category.categories,
			subjects: subject.subjects,
			searchSuggestion: post.searchSuggestion,
			isLoadingsearchSuggestion: post.isLoadingsearchSuggestion,
		}))

	const handleSearch = (e) => {
		e.preventDefault()
		history.push(`/search?keyword=${keyword}`)
	}

	const handleChangeSearchKeyword = (e) => {
		setKeyword(e.target.value)
		dispatch(fetchSearchSuggestion(e.target.value))
	}

	const handleFocusInput = () => {
		if (searchSuggestionRef.current) {
			searchSuggestionRef.current.classList.add('active')
		}
	}

	const handleBlurInput = () => {
		if (searchSuggestionRef.current) {
			searchSuggestionRef.current.classList.remove('active')
		}
	}

	const handleClickSearchSuggestion = (id) => {
		console.log('go')
		return history.push(`/post/${id}`)
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__wrapper'>
					<Link to='/' className='header__logo'>
						<img src={Logo} alt='' className='header__logo__img' />
						<span className='header__logo__text'>Data Structure</span>
					</Link>
					<ul className='header__menu'>
						<li className='header__menu__item'>
							<Link to='/'>Trang chủ</Link>
						</li>
						<li className='header__menu__item'>
							Danh Mục
							<ul className='header__menu__list lv1'>
								{categories &&
									categories.length > 0 &&
									categories.map((item1) => (
										<li
											key={item1._id}
											className='header__menu__list__item lv1'
										>
											<Link to={`/search?category=${item1._id}`}>
												{item1.name}
											</Link>
											<ul className='header__menu__list lv2'>
												{subjects &&
													subjects.length > 0 &&
													subjects.map((item2) =>
														item2.category._id === item1._id ? (
															<li
																key={item2._id}
																className='header__menu__list__item lv2'
															>
																<Link
																	to={`/search?subject=${item2._id}`}
																>
																	{item2.name}
																</Link>
															</li>
														) : null
													)}
											</ul>
										</li>
									))}
							</ul>
						</li>
						<li className='header__menu__item'>Liên Hệ</li>
					</ul>
					<form className='header__search' onSubmit={handleSearch}>
						<div className='header__search__box'>
							<input
								type='search'
								value={keyword}
								onBlur={handleBlurInput}
								onFocus={handleFocusInput}
								placeholder='Nhập từ khóa'
								onChange={handleChangeSearchKeyword}
								className='header__search__box__input'
							/>
							<div
								ref={searchSuggestionRef}
								className='header__search__box__suggestion'
							>
								<ul className='header__search__box__suggestion__list'>
									{isLoadingsearchSuggestion && (
										<li className='header__search__box__suggestion__list__item disabled'>
											<h6 className='header__search__box__suggestion__list__item__title'>
												Đang tải . . .
											</h6>
										</li>
									)}
									{!isLoadingsearchSuggestion &&
										searchSuggestion &&
										searchSuggestion.length === 0 && (
											<li className='header__search__box__suggestion__list__item disabled'>
												<h6 className='header__search__box__suggestion__list__item__title'>
													Không tìm thấy
												</h6>
											</li>
										)}
									{!isLoadingsearchSuggestion &&
										searchSuggestion &&
										searchSuggestion.length > 0 &&
										searchSuggestion.map((item) => (
											<li
												key={item._id}
												onMouseDown={() =>
													handleClickSearchSuggestion(item._id)
												}
												className='header__search__box__suggestion__list__item'
											>
												<h6 className='header__search__box__suggestion__list__item__title'>
													{item.title}
												</h6>
												<div className='header__search__box__suggestion__list__item__icon'>
													<FontAwesomeIcon icon={faArrowRight} />
												</div>
											</li>
										))}
								</ul>
							</div>
						</div>
						<button type='submit' className='header__search__btn'>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
			</div>
		</header>
	)
}

export default Header
