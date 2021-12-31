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
					// {
					// 	widget: 'definition',
					// }
				),
			],
		}))
	}

	handleAnswer(msg) {
		this.setState((prev) => ({
			...prev,
			messages: [
				...prev.messages,
				this.createChatbotMessage(msg, {
					widget: 'definition',
				}),
			],
		}))
	}
}

export default ActionProvider
