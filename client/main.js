import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import '../imports/startup/simpl_schema_error_config'
import { Notes } from '../imports/api/notes'

import { routes, onAuthChange } from '../imports/routes/routes'

Tracker.autorun(() => {
  isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  ReactDOM.render(
    routes, document.querySelector('.app')
    )
  })
