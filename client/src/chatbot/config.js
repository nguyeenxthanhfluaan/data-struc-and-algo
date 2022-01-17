import { createChatBotMessage } from 'react-chatbot-kit'
import Definition from './Definition'

const config = {
	botName: 'Daisy',
	initialMessages: [
		createChatBotMessage(
			`Xin chào! Tên tôi là Daisy. Tôi ở đây để trả lời cho bạn các định nghĩa mà tôi biết !`,
			{
				delay: 0,
			}
		),
		createChatBotMessage('Bạn muốn biết định nghĩa gì ?', {
			withAvatar: false,
			// delay: 500,
			widget: 'definition',
		}),
	],
	customComponents: {
		header: () => (
			<div
				style={{
					backgroundColor: '#2898ec',
					color: '#ddd',
					padding: '5px',
					borderTopLeftRadius: '5px',
					borderTopRightRadius: '5px',
					display: 'flex',
					paddingTop: '12.5px',
					paddingBottom: '12.5px',
					paddingRight: '12.5px',
					paddingLeft: '12.5px',
					fontWeight: '700',
					alignItems: 'center',
				}}
			>
				Trò chuyện cùng Daisy
			</div>
		),
	},
	widgets: [
		{
			widgetName: 'definition',
			widgetFunc: (props) => <Definition {...props} />,
		},
	],
}

export default config
