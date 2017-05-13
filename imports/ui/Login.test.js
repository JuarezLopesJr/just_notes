import React from 'react'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'
import expect from 'expect'
import { Login } from './Login'

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'This is not working'
      const wrapper = mount(<Login loginWithPassword={() => {}}/>)

      wrapper.setState({error})

      expect(wrapper.find('p').text()).toBe(error)

      wrapper.setState({ error: ''})
      expect(wrapper.find('p').length).toBe(0)
    })

    it('should call loginWithPassword with form data', function () {
      const email = 'gael@beach.pe'
      const password = '123456'
      const spy = expect.createSpy()

      const wrapper = mount(<Login loginWithPassword={spy} />)
      wrapper.ref('email').node.value = email
      wrapper.ref('password').node.value = password

      wrapper.find('form').simulate('submit')

// not using toHaveBeenCalledWith, because it's demand all parameters from
// the testing function, in this case the onSubmit is called with 3 parameters
// for this test i'm calling only 2 parameters: email and password
// spy.calls is from the dev tools console,just call spy.calls
      expect(spy.calls[0].arguments[0]).toEqual({email})
// i'm using toBe instead of toEqual, because the argument is not an object
      expect(spy.calls[0].arguments[1]).toBe(password)

    })

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy()
      const wrapper = mount(<Login loginWithPassword={spy}/>)

      wrapper.find('form').simulate('submit')

      spy.calls[0].arguments[2]({})
      expect(wrapper.state('error')).toNotBe(0)

      spy.calls[0].arguments[2]()
      expect(wrapper.state('error')).toBe('')
    })
  })
}
