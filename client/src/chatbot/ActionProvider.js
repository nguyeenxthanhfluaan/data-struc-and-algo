class ActionProvider {
	constructor(createChatbotMessage, setStateFunc, createClientMessage) {
		this.createChatbotMessage = createChatbotMessage
		this.setState = setStateFunc
		this.createClientMessage = createClientMessage
	}

	handleServerError() {
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
