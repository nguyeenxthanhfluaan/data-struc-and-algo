import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Logo from '../assets/images/logo2.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
	const history = useHistory()

	const [keyword, setKeyword] = useState('')

	const { categories, subjects } = useSelector(({ category, subject }) => ({
		categories: category.categories,
		subjects: subject.subjects,
	}))

	const handleSearch = (e) => {
		e.preventDefault()
		history.push(`/search?keyword=${keyword}`)
	}

	return (
		<header className='header'>
			<div className='container'>
				<div className='header__wrapper'>
					<div className='header__logo'>
						<Link to='/'>
							<img src={Logo} alt='' className='header__logo__img' />
							<span className='header__logo__text'>Data Structure</span>
						</Link>
					</div>
					<ul className='header__menu'>
						<li className='header__menu__item'>
							<Link to='/'>Trang chủ</Link>
						</li>
						<div className='header__menu__item'>
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
						</div>
						<li className='header__menu__item'>Liên Hệ</li>
					</ul>
					<form className='header__search' onSubmit={handleSearch}>
						<input
							type='search'
							className='header__search__input'
							placeholder='Nhập từ khóa'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<button type='submit' className='header__search__icon'>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
			</div>
		</header>
	)
}

export default Header
