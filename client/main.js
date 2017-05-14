import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { routes, onAuthChange } from '../imports/routes/Routes'
import '../imports/startup/simpl_schema_config'
import { Session } from 'meteor/session'


Tracker.autorun(() => {
  const isAuth = !!Meteor.userId()
  onAuthChange(isAuth)
})


Meteor.startup(() => {
    ReactDOM.render(
      routes, document.querySelector('.render-target')
    )
  })
