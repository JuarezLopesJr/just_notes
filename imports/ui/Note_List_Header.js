import React from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'

export const NoteListHeader = (props) => {
  const { meteorCall } = props
  return (
    <div>
      <button onClick={() => meteorCall('notes.insert')} >Create New</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader)
