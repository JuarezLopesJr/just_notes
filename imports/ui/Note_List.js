import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'
import NoteListHeader from './Note_List_Header'
import NoteListItem from './Note_List_Item'


export const NoteList = (props) => {
  const { notes } = props

  return (
    <div>
      NoteList { notes.length }
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
  Meteor.subscribe('notes')
  return {
    notes: Notes.find().fetch()
  }
}, NoteList)