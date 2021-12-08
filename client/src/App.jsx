import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './scss/index.scss'

import { fetchCategory } from './redux/category/category.actions'
import { fetchSubject } from './redux/subject/subject.actions'

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'

import Homepage from './pages/HomePage'
import PostDetail from './pages/PostDetail'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategory())
		dispatch(fetchSubject())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Menu />
				<div style={{ flex: 1 }}>
					<Switch>
						<Route path='/' exact component={Homepage} />
						<Route path='/post/detail/:id' exact component={PostDetail} />
					</Switch>
				</div>
			</div>
			<Footer />
		</BrowserRouter>
	)
}

export default App
