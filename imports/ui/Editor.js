import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'

export class Editor extends Component {
  constructor(props) {
    super(props)

    this.onNoteChange = this.onNoteChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  onTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    })
  }

  onNoteChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      content: e.target.value
    })
  }

  render () {
    const { note, selectedNoteId } = this.props
    if (note) {
      return (
        <div>
          <input value={note.title}
          placeholder='Title here'
          onChange={this.onTitleChange}/>

          <textarea value={note.content}
            onChange={this.onNoteChange}
            placeholder='Type note here'>
            </textarea>
          <button onClick={() => {
            this.props.call('notes.remove', note._id)
          }}>Delete note</button>
        </div>
      )
    } else {
      return (
        <div>
          {selectedNoteId ?
          <p>Note not found</p> :
           <p>Pick or Create note to start</p>}
         </div>
      )
    }
  }
}
// set prop-types outside the component block
Editor.propTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object,
  call: PropTypes.func
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call

  }
}, Editor)
