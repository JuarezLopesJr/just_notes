import React from 'react'
import PrivateHeader from './Private_Header'
import NoteList from './Note_List'

export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard'  />
      <div className='page-content'>
        <NoteList />
      </div>
    </div>
  )
}
