import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

const NoteListHeader = ({ meteorCall }) => {
  return (
    <div>
      <button
        onClick={ () => meteorCall('notes.create') }
        >Create note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}


export default createContainer(() => {
  return { meteorCall: Meteor.call }
}, NoteListHeader)
