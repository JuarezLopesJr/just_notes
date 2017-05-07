import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

const App = () => {
  return (
    <div>
      <h1>Notes App Init</h1>
    </div>
  )
}

Meteor.startup(() => {
    ReactDOM.render(
      <App/>, document.querySelector('.render-target')
    )
  })
