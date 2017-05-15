import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/404'
import Login from '../ui/Login'
import { Session } from 'meteor/session'

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

const onNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/')
  } else {
    Session.set('selectedNoteId', nextState.params.id)
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

export const onRootEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length -1]
  Session.set('currentPrivacyPage', lastRoute.privacy)
// also set the currentPrivacyPage value in client/main.js to the Tracker
}

export const onRootChange = (prevState, nextState) => {
  onRootEnter(nextState)
}

export const routes = (
  <Router history={browserHistory}>
{/* i'm nesting routes to keep track of url dynamic changes
  and passing some custom props(private) to set the values of the url path
  to use it with Session set/get method, that way i'll always redirect to the
  right dynamic url provided by /dashboard/:id
  After nesting routes, i'm gonna call 2 functions to execute this task
  onEnter - executes first when the page is loaded
  onChange - keep track of the dynamic url
 */}
    <Route onEnter={onRootEnter}  onChange={onRootChange}>
      <Route path='/' component={Login} privacy='unauth' onEnter={onPublicPage}/>
      <Route path='/signup' component={Signup} privacy='unauth' onEnter={onPublicPage}/>
      <Route path='/dashboard' component={Dashboard} privacy='auth' onEnter={onPrivatePage}/>
      <Route path='/dashboard/:id' component={Dashboard} privacy='auth' onEnter={onNotePage}/>
      <Route path='*' component={NotFound} />
  </Route>
  </Router>
)
