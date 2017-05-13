import { Notes } from './notes'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'

if (Meteor.isServer) {
  describe('Notes', function () {
    const noteData = {
      _id: 'testnote0',
      title: 'Test Title',
      content: 'Test content',
      userId: 'testuser0',
      updatedAt: 0
    }

    const noteDataOne = {
      _id: 'testnote1',
      title: 'Some new reminder',
      content: 'something to do',
      userId: 'testuser1',
      updatedAt: 0
    }


    beforeEach(function () {
      Notes.remove({})
      Notes.insert( noteData )
      Notes.insert( noteDataOne )
    })

    it('should insert new note value', function () {
      const userId = 'test_id'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })

      expect(Notes.findOne({ _id, userId })).toExist()

    })

    it('should not insert new note value', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']()
      }).toThrow()
    })

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({
        userId: noteData.userId
      },[ noteData._id ]) // this is the first argument from the Meteor.remove method

      expect(Notes.findOne({ _id: noteData._id })).toNotExist()
    })

    it('should not remove if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [ noteData._id ])
      }).toThrow()
    })

    it('should not remove if has invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteData.userId})
      }).toThrow()
    })

    it('should update note', function () {
      const title = 'Test title update'
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteData.userId
      }, [
        noteData._id,
        { title }
      ])

      const note = Notes.findOne(noteData._id)

      expect(note.updatedAt).toBeGreaterThan(0)
      expect(note).toInclude({
        title,
        content: noteData.content
      })
    })
    // checking if malicious code are updated
    it('should throw error if extra updates are given', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteData.userId
        }, [
          noteData._id,
          { title, ownerId: 'new_ownerId' }
        ])
      }).toThrow()
    })

    it('should not update if the owner is not userId', function () {
      const title = 'Test an updated title '
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'test_id'
      }, [
        noteData._id,
        { title }
      ])

      const note = Notes.findOne(noteData._id)

      expect(note).toInclude( noteData )
    })

    it('should not update if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [ noteData._id ])
      }).toThrow()
    })

    it('should not update if has invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteData.userId})
      }).toThrow()
    })

    it('should return users note', function () {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: noteDataOne.userId })
      const notes = result.fetch()

      expect(notes.length).toBe(1)
      expect(notes[0]).toEqual(noteDataOne)
    })

    it('should not return note if user has none', function () {
      const result = Meteor.server.publish_handlers.notes.apply({ userId: 'other id' })
      const notes = result.fetch()

      expect(notes.length).toBe(0)
    })

  })

}
