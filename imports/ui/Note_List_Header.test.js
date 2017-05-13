import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'
import { NoteListHeader } from './Note_List_Header'

if (Meteor.isClient) {

  describe('NoteListHeader', function () {
    it('should call meteorCall on click', function () {
      const spy = expect.createSpy()
      // always pass the props as value to the spy
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>)

      wrapper.find('button').simulate('click')
      // call the function spy with the name of the argument that the parent
      // function(meteorCall) is supposed to call, in this case 'notes.insert'
      expect(spy).toHaveBeenCalledWith('notes.insert')

    })
  })
}
