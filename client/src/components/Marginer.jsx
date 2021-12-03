import React from 'react'

const Marginer = ({ direction, margin }) => {
	if (direction === 'vertical') {
		return <div style={{ width: margin, height: '100%' }}></div>
	} else {
		return <div style={{ height: margin, width: '100%' }}></div>
	}
}

export default Marginer
