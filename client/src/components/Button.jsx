import React from 'react'

const Button = ({ className, style, onClick }) => {
	return (
		<button
			className={`btn ${className ? className : ''}`}
			style={style}
			onClick={onClick ? onClick : null}
		>
			{props.children}
		</button>
	)
}

export default Button
