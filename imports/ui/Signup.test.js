import React from 'react'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'
import { Signup } from './Signup'

if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function () {
      const error = 'This is not working'
      const wrapper = mount(<Signup createUser={() => {}}/>)

      wrapper.setState({error})

      expect(wrapper.find('p').text()).toBe(error)

      wrapper.setState({ error: ''})
      expect(wrapper.find('p').length).toBe(0)
    })

    it('should call createUser with form data', function () {
      const email = 'gael@beach.pe'
      const password = '123456'
      const spy = expect.createSpy()

      const wrapper = mount(<Signup createUser={spy} />)
      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password

      wrapper.find('form').simulate('submit')

      expect(spy.calls[0].arguments[0]).toEqual({email, password})

    })

    it('should set error if small password', function () {
      const email = 'gael@beach.pe'
      const password = '123456'
      const spy = expect.createSpy()

      const wrapper = mount(<Signup createUser={spy} />)
      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password

      wrapper.find('form').simulate('submit')

      expect(wrapper.state('error')).toNotBe(0)

    })

    it('should set createUser callback errors', function () {
      const spy = expect.createSpy()
      const password = '123456'
      const reason = 'Reason failed test'
      const wrapper = mount(<Signup createUser={spy}/>)

      wrapper.ref('password').node.value = password

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[1]({reason})
      expect(wrapper.state('error')).toBe(reason)

      spy.calls[0].arguments[1]()
      expect(wrapper.state('error')).toBe('')
    })
  })
}
