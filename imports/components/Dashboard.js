import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
          <PrivateHeader />
          <div className='page-content'>
            <NoteList />
          </div>
      </div>

    )
  }
}

export default Dashboard
