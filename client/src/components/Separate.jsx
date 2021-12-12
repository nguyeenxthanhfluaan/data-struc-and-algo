import React from 'react'

const Separate = ({ direction = 'horizontal', thickness = '1px' }) => {
	if (direction === 'horizontal') {
		return (
			<div
				style={{ width: '100%', height: thickness, background: '#000' }}
			></div>
		)
	} else {
		return (
			<div
				style={{ height: '100%', width: thickness, background: '#000' }}
			></div>
		)
	}
}

export default Separate
