import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export const PrivateHeader = (props) => {
  return (
    <div className='header'>
      <div className='header__content'>
        <h1 className='header__title'>Dashboard</h1>
        <button
          className='button button--link-text'
          onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired // getting props from createContainer
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()// sending props to PrivateHeader
  }
}, PrivateHeader)


// class PrivateHeader extends Component {
//   constructor(props) {
//     super(props)
//
//     this.onLogout = this.onLogout.bind(this)
//   }
//
//   onLogout() {
//     Accounts.logout()
//   }
//
//   render () {
//     return (
      // <div>
      //   <button onClick={this.onLogout}>Log Out</button>
      // </div>
//     )
//   }
// }
//
// export default PrivateHeader
