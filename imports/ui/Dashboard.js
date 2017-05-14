import React from 'react'
import PrivateHeader from './Private_Header'
import NoteList from './Note_List'
import Editor from './Editor'

export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard'  />
      <div className='page-content'>
        <NoteList />
        <Editor/>
      </div>
    </div>
  )
}
