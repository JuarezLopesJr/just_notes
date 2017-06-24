import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'

const PrivateHeader = ({ handleLogout }) => {
  return (
    <div className='header'>
      <div className='header__content'>
        <h2 className='header__title'>Just Notes</h2>
        <button className='button button--link-text' onClick={
          handleLogout
        }>Logout</button>
      </div>
    </div>
  )
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
}, PrivateHeader)
