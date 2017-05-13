import React, { Component } from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { error : ''}

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleSubmit(e) {
      e.preventDefault()
      let email = this.refs.email.value.trim()
      let password = this.refs.password.value.trim()

      this.props.loginWithPassword({email}, password, (err) => {
        if (err) {
          this.setState({error: err.reason})
        } else {
          this.setState({error: ''})
        }
      })
  }

  render () {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
            <h1>Login</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit} noValidate className='boxed-view__form'>
            <input type='text' ref='email' placeholder='Enter email' />
            <input type='password' ref='password' placeholder='Enter password' />
            <button className='button'>Login</button>
          </form>

          <Link to='/signup'>Don't have an account ?</Link>
      </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login)
