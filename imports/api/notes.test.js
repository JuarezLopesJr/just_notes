import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { Notes } from './notes'

if(Meteor.isServer) {
  describe('Notes', function () {
    const noteOne = {
      _id: 'test_id_1',
      title: 'Test title',
      content: 'Test content',
      updatedAt: 0,
      userId: 'testUserId_1'
    }

    beforeEach(function () {
      Notes.remove({})
      Notes.insert(noteOne)
    })

    it('should insert new note', function () {
      const userId = noteOne.userId
      const _id = Meteor.server.method_handlers['notes.create'].apply({ userId })

      expect(Notes.findOne({ _id, userId })).toExist()
    })

    it('should not create note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.create']()
      }).toThrow()
    })

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({
        userId: noteOne.userId
      }, [noteOne._id])
      expect(Notes.findOne({ _id: noteOne._id})).toNotExist()
    })

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).toThrow()
    })

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({
          userId: noteOne.userId
        }, [])
      }).toThrow()
    })

    it('should update note', function () {
      const title = 'Update test title'
      Meteor.serve.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ])
    })
  })
}
