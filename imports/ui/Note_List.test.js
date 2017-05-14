import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { Meteor } from 'meteor/meteor'
import { NoteList } from './Note_List'


const notes = [
  {
    _id: 'test_id0',
    title: ' test title 0',
    content: '',
    updatedAt: 0,
    userId: 'userId0'
  }, {
    _id: 'test_id1',
    title: '',
    content: 'test content 0',
    updatedAt: 1,
    userId: 'userId1'

  }
]

if (Meteor.isClient) {
  describe('NoteList', function () {
    it('should render NoteListItem for each note', function () {
      const wrapper = mount(<NoteList notes={notes}/>)

      expect(wrapper.find('NoteListItem').length).toBe(2)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
    })

    it('should render NoteListEmptyItem if no notes available', function () {
      const wrapper = mount(<NoteList notes={[]}/>)

      expect(wrapper.find('NoteListItem').length).toBe(0)
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
    })

  })
}
