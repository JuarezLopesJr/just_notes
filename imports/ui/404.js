import React from 'react'
import { Link } from 'react-router'

export default () => {
  return (
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Not Found Dude!</h1>
        <p>Check your link, we're unable to find that page</p>
        <Link to='/' className='button--link'>Head Home</Link>
      </div>
    </div>
  )
}
