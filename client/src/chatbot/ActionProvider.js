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

	hadnleServerError() {
		this.setState((prev) => ({
			...prev,
			messages: [
				...prev.messages,
				this.createChatbotMessage(
					'Ups, xin lỗi bạn, máy chủ đang lỗi . . .'
				),
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
