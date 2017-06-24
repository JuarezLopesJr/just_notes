import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'

import NoteListHeader from './NoteListHeader'

const NoteList = ({ notes }) => {
  return (
    <div>
      <NoteListHeader/>
      NoteList { notes.length }
    </div>
  )
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('notes')
  return { notes: Notes.find({}).fetch() }
}, NoteList)
