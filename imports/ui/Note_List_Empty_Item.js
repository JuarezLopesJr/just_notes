import React from 'react'
// make a named functional component is better to test
// check the output inside react dev tools, and select it to test with enzyme
// don't do this for testing : expect default () => ..., always name
// the component, and export it default 

const NoteListEmptyItem = () => {
  return (
    <div>
      <h5>You don't have any notes yet</h5>
      <p>Create a note to start</p>
    </div>
  )
}

export default NoteListEmptyItem
