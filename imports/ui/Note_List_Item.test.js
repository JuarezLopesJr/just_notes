import React from 'react'
import { Meteor } from 'meteor/meteor'
import expect from 'expect'
import { mount } from 'enzyme'
import { NoteListItem } from './Note_List_Item'
import { notes } from '../fixtures/fixtures'

if (Meteor.isClient) {
  let Session

  beforeEach(() => {
    Session = {
      set: expect.createSpy()
    }
  })


  describe('NoteListItem', function () {
    it('should set title and timestamp', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe(notes[0].title)
      expect(wrapper.find('p').text()).toBe('May 13, 2017')

    })

    it('should set the default undefined title if not provided', function () {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>)

      expect(wrapper.find('h5').text()).toBe('Untitled')
    })

    it('should call set on click', function () {
      const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)

      wrapper.find('div').simulate('click')

      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
    })
  })
}
