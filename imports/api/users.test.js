import expect from 'expect'
import { Meteor } from 'meteor/meteor'


import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('User Tests', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails : [
          {
            address: 'test@example.com'
          }
        ]
      }
      const res = validateNewUser(testUser)
      expect(res).toBe(true)
    })

    it('should block invalid email address', function () {
      const testUser = {
        emails : [
          {
            address: 'test.example.com'
          }
        ]
      }
      expect(() => {
        validateNewUser(testUser)
      }).toThrow()
    })
  })
}
