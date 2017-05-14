import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/404'
import Login from '../ui/Login'

const unAuthPages = ['/', '/signup'] // if logged in dont show this
const authPages = ['/dashboard'] // show only if logged in
// avoid already authenticated users go back to signup page with back button
const onPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard')
  }
}
// this method avoid unauthorized users to go back using browser back button
const onPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/')
  }
}

export const onAuthChange = (isAuth) => {
  const { pathname } = browserHistory.getCurrentLocation()
  const isUnAuthPage = unAuthPages.includes(pathname)
  const isAuthPage = authPages.includes(pathname)

  if (isUnAuthPage && isAuth) { // if logged in dont show this, show /dashboard
    browserHistory.replace('/dashboard')
  } else if (isAuthPage && !isAuth) { // if not logged in , redirect to login page
    browserHistory.replace('/')
  }

}

export const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Login} onEnter={onPublicPage}/>
    <Route path='/signup' component={Signup} onEnter={onPublicPage}/>
    <Route path='/dashboard' component={Dashboard} onEnter={onPrivatePage}/>
    <Route path='*' component={NotFound} />
  </Router>
)
