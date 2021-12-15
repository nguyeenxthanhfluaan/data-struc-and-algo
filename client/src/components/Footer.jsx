import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/images/logo-footer.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCheckCircle,
	faGlobe,
	faLocationArrow,
	faMapMarkedAlt,
	faMapMarkerAlt,
	faQuestionCircle,
	faStarOfLife,
} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer__logo'>
				<img src={logo} alt='' />
			</div>
			<div className='footer__list'>
				<Link to='/' className='footer__list__item'>
					<FontAwesomeIcon
						icon={faGlobe}
						swapOpacity
						className='footer__list__item__icon'
					/>
					<span className='footer__list__item__text'>About us</span>
				</Link>
				<Link to='/' className='footer__list__item'>
					<FontAwesomeIcon
						icon={faStarOfLife}
						className='footer__list__item__icon'
					/>
					<span className='footer__list__item__text'>Terms of use</span>
				</Link>
				<Link to='/' className='footer__list__item'>
					<FontAwesomeIcon
						icon={faCheckCircle}
						className='footer__list__item__icon'
					/>
					<span className='footer__list__item__text'>Privacy policy</span>
				</Link>
				<Link to='/' className='footer__list__item'>
					<FontAwesomeIcon
						icon={faQuestionCircle}
						className='footer__list__item__icon'
					/>
					<span className='footer__list__item__text'>FAQ's</span>
				</Link>
				<Link to='/' className='footer__list__item'>
					<FontAwesomeIcon
						icon={faMapMarkerAlt}
						className='footer__list__item__icon'
					/>
					<span className='footer__list__item__text'>Contact</span>
				</Link>
			</div>
			<div className='footer__copyright'>
				© Copyright 2021. All rights reserved
			</div>
		</div>
	)
}

export default Footer
