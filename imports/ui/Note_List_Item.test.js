import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'
import NoteListItem from './Note_List_Item'


if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should set title and timestamp', function () {
      const title = 'My test title'
      const updatedAt = 1494700222936
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

      expect(wrapper.find('h5').text()).toBe(title)
      expect(wrapper.find('p').text()).toBe('1494700222936')

    })

    it('should set the default undefined title if not provided', function () {
      const title = ''
      const wrapper = mount(<NoteListItem note={{ title }} />)

      expect(wrapper.find('h5').text()).toBe('Untitled')
    })
  })
}
