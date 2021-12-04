import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './scss/index.scss'

import Header from './components/Header'
import Footer from './components/Footer'

import Homepage from './pages/HomePage'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Switch>
					<Route path='/' component={Homepage} />
				</Switch>
			</div>
			<Footer />
		</BrowserRouter>
	)
}

export default App
