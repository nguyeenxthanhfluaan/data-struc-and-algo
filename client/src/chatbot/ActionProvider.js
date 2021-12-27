class ActionProvider {
	constructor(createChatbotMessage, setStateFunc, createClientMessage) {
		this.createChatbotMessage = createChatbotMessage
		this.setState = setStateFunc
		this.createClientMessage = createClientMessage
	}

	handleException() {
		this.setState((prev) => ({
			...prev,
			messages: [
				...prev.messages,
				this.createChatbotMessage(
					'Xin lỗi, Tôi không hiểu bạn đang nói gì!'
				),
			],
		}))
	}

	handleSaidName() {
		this.setState((prev) => ({
			...prev,
			messages: [
				...prev.messages,
				this.createChatbotMessage('Tôi tên là Daisy. Còn bạn tên gì?'),
			],
		}))
	}

	handleWaiting() {
		this.setState((prev) => ({
			...prev,
			messages: [
				...prev.messages,
				this.createChatbotMessage('Please waiting . . .'),
			],
		}))
	}

	handleAsk(msg) {
		this.setState((prev) => ({
			...prev,
			messages: [...prev.messages, this.createChatbotMessage(msg)],
		}))
	}
}

export default ActionProvider
