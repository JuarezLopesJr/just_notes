import React from 'react'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'
import { PrivateHeader } from './Private_Header'

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to Logout', function () {
      const wrapper = mount(<PrivateHeader handleLogout={() => {}}/>)

      const buttonTest = wrapper.find('button').text() //tracking DOM elements, kinda like jquery

      expect(buttonTest).toBe('Logout')
    })

    it('should set header title to Dashboard', function () {
      const wrapper = mount(<PrivateHeader handleLogout={() => {}}/>)

      const headerTest = wrapper.find('h1').text()

      expect(headerTest).toBe('Dashboard')
    })

    it('should call handleLogout on click', function () {
      spy = expect.createSpy()
      const wrapper = mount(<PrivateHeader handleLogout={spy}/>)
// dont need to reference the wrapper below to a variable, because no value
// will be stored, just the click simulation
// without the simulate method, the call wouldn't happen
      wrapper.find('button').simulate('click')

      expect(spy).toHaveBeenCalled()
    })
  })
}
