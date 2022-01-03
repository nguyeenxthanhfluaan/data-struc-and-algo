import React, { useState, useEffect } from 'react'
import axios from 'axios'
import optionWidgets from './optionWidgets'

const Definition = (props) => {
	return (
		<div className='chatbot-definition'>
			{optionWidgets.map(({ keyword, display }) => (
				<DefinitionItem
					{...props}
					key={display}
					keyword={keyword}
					display={display}
				/>
			))}
		</div>
	)
}

const DefinitionItem = ({ display, keyword, actionProvider }) => {
	const [answer, setAnswer] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	const onClick = () => {
		if (isLoading === false) {
			if (answer.errorMsg) {
				return actionProvider.handleAnswer(answer.errorMsg)
			}

			if (answer.msg) {
				return actionProvider.handleAnswer(answer.msg)
			} else {
				actionProvider.handleServerError()
			}
		} else {
			return actionProvider.handleAnswer('Đang tải . . .')
		}
	}

	useEffect(async () => {
		const { data } = await axios.get(`/api/chatbot/ask/${keyword}`)
		setAnswer(data)
		setIsLoading(false)
	}, [])

	return (
		<div className='chatbot-definition__item' onClick={onClick}>
			{display}
		</div>
	)
}

export default Definition
