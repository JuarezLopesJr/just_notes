import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListItem = (props) => {
  const { title, updatedAt, _id, selected } = props.note
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', _id)
    }}>
      <h5>{ title || 'Untitled' }</h5>
      { selected ? <p>selected</p> : undefined }
      <p>{  moment(updatedAt).format('MMM DD, YYYY') }</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default createContainer(() => {
  return { Session }
}, NoteListItem)
