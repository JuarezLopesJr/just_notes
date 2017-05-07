import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not logged / not authorized')
    }

    return Notes.insert({
      title: '',
      content: '',
      userId: this.userId,
      updatedAt: moment().format('ddd, MMM DD, YY')
    })
  },

  'notes.remove'(_id) {
    return Notes.remove({ _id })
  }
})

export const Notes = new Mongo.Collection('notes')
