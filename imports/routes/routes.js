import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import SignUp from '../components/SignUp'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import NotFound from '../components/NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']


// this function makes all validation without the onEnter props
export const onAuthChange = (isAuthenticated) => {
  const { pathname } = browserHistory.getCurrentLocation()
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}

export const routes = (
  <Router history={ browserHistory }>
    <Route path='/' component={ Login }/>
    <Route path='/signup' component={ SignUp }/>
    <Route path='/dashboard' component={ Dashboard } />
    <Route path='*' component={ NotFound } />
  </Router>
)
