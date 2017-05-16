import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session'
import { Notes } from '../api/notes'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: ''
    }


    this.onNoteChange = this.onNoteChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.handleDeleteNote = this.handleDeleteNote.bind(this)
  }

  onTitleChange(e) {
    const title = e.target.value
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, { title })
  }

  onNoteChange(e) {
    const content = e.target.value
    this.setState({ content })
    this.props.call('notes.update', this.props.note._id, { content })
  }

  handleDeleteNote() {
    this.props.call('notes.remove', this.props.note._id)
    browserHistory.replace('/dashboard')
  }

  componentDidUpdate(prevProps, prevState) {
    const { note } = this.props
    const currentNoteId = note ? note._id : undefined
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        content: this.props.note.content
      })
    }
  }

  render () {
    const { note, selectedNoteId } = this.props
    if (note) {
      return (
        <div>
          <input value={this.state.title}
          placeholder='Title here'
          onChange={this.onTitleChange}/>

          <textarea value={this.state.content}
            onChange={this.onNoteChange}
            placeholder='Type note here'>
            </textarea>
          <button onClick={this.handleDeleteNote}>Delete note</button>
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
