import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { routes, onAuthChange } from '../imports/routes/Routes'
import '../imports/startup/simpl_schema_config'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'


Tracker.autorun(() => {
  const isAuth = !!Meteor.userId()
  const currentPrivacyPage = Session.get('currentPrivacyPage')

  onAuthChange(isAuth, currentPrivacyPage)
})

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`)
  }
})


Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
    ReactDOM.render(
      routes, document.querySelector('.render-target')
    )
  })
