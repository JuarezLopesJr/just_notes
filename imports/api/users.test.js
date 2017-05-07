import expect from 'expect'
import { validateNewUser } from './users'
import { Meteor } from 'meteor/meteor'

if (Meteor.isServer) {
  describe('users', function () {
    it('should validate email', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      }
      const res = validateNewUser(testUser)

      expect(res).toBe(true)

    })
    it('should reject invalid email', function () {
      const testUser = {
        emails: [
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
