import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import SimpleSchema from 'simpl-schema'

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId })
  })
}

Meteor.methods({
  'notes.insert'() {
    if (!this.userId) {
      throw new Meteor.Error('not logged / not authorized')
    }

    return Notes.insert({
      title: '',
      content: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
  },

  'notes.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })      // always check the ownerId
    return Notes.remove({ _id, userId: this.userId })
  },

  'notes.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      content: {
        type: String,
        optional: true
      }
    }).validate({ _id, ...updates })
    // using spread operators syntax to filter malicious code not defined
    // in the SimpleSchema method, which will prevent bad code inside the db

    return Notes.update({
      _id,
    userId: this.userId
  },
    {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates // already validate code from SimpleSchema
        // it could be only the body, only the title or both updated
      }
    })
  }

})

export const Notes = new Mongo.Collection('notes')
