import { Notes } from './notes'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'

if (Meteor.isServer) {
  describe('Notes', function () {
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
  })
}
