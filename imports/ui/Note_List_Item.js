import React from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import moment from 'moment'

const NoteListItem = (props) => {
  const { title, updatedAt } = props.note
  return (
    <div>
      <h5>{ title || 'Untitled' }</h5>
      <p>{  moment(updatedAt).format('MMM DD, YYYY') }</p>
    </div>
  )
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
}

export default NoteListItem
