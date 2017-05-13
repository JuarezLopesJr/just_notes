import React, { Component } from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = { error : ''}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
      e.preventDefault()
      let email = this.refs.email.value.trim()
      let password = this.refs.password.value.trim()

      if (password.length < 6) {
        return this.setState({error: 'Password must be at least 6 characters long'})
      }

      this.props.createUser({email, password}, (err) => {
        if (err) {
          this.setState({ error: err.reason})
        } else {
          this.setState({error: ''})
        }
      })
    }


  render () {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
            <h1>Joint</h1>
            {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.handleSubmit} noValidate className='boxed-view__form'>
            <input type='text' ref='email' placeholder='Enter email' />
            <input type='password' ref='password' placeholder='Enter password' />
            <button className='button'>Create Account</button>
          </form>

          <Link to='/'>Already have an account ?</Link>
      </div>
      </div>

    )
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  }
}, Signup)