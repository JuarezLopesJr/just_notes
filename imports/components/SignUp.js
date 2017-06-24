import React, { Component } from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = { error: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if(password.length < 5) {
      return this.setState({ error: 'Password must be longer than 5 characters'})
    }

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason })
      } else {
        this.setState({ error: '' })
      }
    })

  }

  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h2>SignUp</h2>
          <form onSubmit={ this.handleSubmit } className='boxed-view__form' noValidate>
            { this.state.error ? <p>{ this.state.error }</p> : undefined }
            <input type='email' ref='email' name='email' placeholder='Email'/>
            <input type='password' ref='password' name='password' placeholder='Password'/>
            <button className='button'>Create</button>
          </form>

        <Link to='/'>Already have an Account ?</Link>
      </div>
      </div>
    )
  }
}

export default SignUp
