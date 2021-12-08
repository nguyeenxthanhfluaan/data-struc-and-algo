import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../assets/images/data-structure-mini-logo.jpg'
import listIcon from '../assets/images/list-icon.png'

const Menu = () => {
	const { categories, subjects } = useSelector(({ category, subject }) => ({
		categories: category.categories,
		subjects: subject.subjects,
	}))

	return (
		<div className='menu'>
			<div className='menu__logo'>
				<img src={logo} alt='' className='menu__logo__img' />
			</div>
			<ul className='menu__list'>
				{categories &&
					categories.length > 0 &&
					categories.map((category) => (
						<li key={category._id} className='menu__list__item'>
							<h6 className='menu__list__item__heading'>
								{category.name}
							</h6>
							{subjects &&
								subjects.length > 0 &&
								subjects.map((subject) =>
									subject.category._id === category._id ? (
										<Link
											key={`${category._id}${subject._id}`}
											to='/'
										>
											<div className='menu__list__item__content'>
												<span className='menu__list__item__content__dot'>
													<img src={listIcon} alt='' />
												</span>
												<div className='menu__list__item__content__text'>
													{subject.name}
												</div>
											</div>
										</Link>
									) : null
								)}
						</li>
					))}
			</ul>
		</div>
	)
}

export default Menu
