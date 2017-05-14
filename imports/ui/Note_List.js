import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'
import NoteListHeader from './Note_List_Header'
import NoteListItem from './Note_List_Item'
import NoteListEmptyItem from './Note_List_Empty_Item'
import { Session } from 'meteor/session'

export const NoteList = (props) => {
  const { notes } = props

  return (
    <div>
      NoteList { notes.length }
      {notes.length === 0 ? <NoteListEmptyItem/> : undefined}
      <NoteListHeader/>
      {props.notes.map((note) => {
        return <NoteListItem key={ note._id } note={note}/>
      })}
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}


export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  Meteor.subscribe('notes')
  return {
    notes: Notes.find().fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      }
    })
  }
}, NoteList)
