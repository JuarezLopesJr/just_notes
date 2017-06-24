import { Meteor } from 'meteor/meteor'
import '../imports/startup/simpl_schema_error_config'
import { Notes } from '../imports/api/notes'

Meteor.startup(() => {
  Meteor.publish('notes', function () {
    return Notes.find({})
  })
})
