import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './scss/index.scss'

import { fetchCategory } from './redux/category/category.actions'
import { fetchSubject } from './redux/subject/subject.actions'

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'

import HomePage from './pages/HomePage'
import PostDetailPage from './pages/PostDetailPage'
import SearchPage from './pages/SearchPage'
import { fetchTypes } from './redux/type/type.actions'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategory())
		dispatch(fetchSubject())
		dispatch(fetchTypes())
	}, [])

	return (
		<BrowserRouter>
			<Header />
			<div className='container'>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/post/:id' exact component={PostDetailPage} />
					<Route path='/search/' exact component={SearchPage} />
				</Switch>
			</div>
			<Footer />
		</BrowserRouter>
	)
}

export default App
