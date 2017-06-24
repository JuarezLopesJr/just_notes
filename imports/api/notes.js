import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import moment from 'moment'

export const Notes = new Mongo.Collection('notes')

Meteor.methods({
  'notes.create': function () {
    if (!this.userId) {
      throw new Meteor.Error(400, 'Access Denied! User not logged!')
    }

    return Notes.insert({
      title: '',
      content: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    })
  },

  'notes.remove': function (_id) {
    if (!this.userId) {
      throw new Meteor.Error(400, 'Access Denied! User not logged!')
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })

    return Notes.remove({ _id, userId: this.userId })
  },

  'notes.update': function (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error(400, 'Access Denied! User not logged!')
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
  }).validate({
    _id,
    ...updates
  })
  return Notes.update(_id, {
    $set: {
      updatedAt: moment().valueOf(),
      ...updates
    }
  })
 }
})
