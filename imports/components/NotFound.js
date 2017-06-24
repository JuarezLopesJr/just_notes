import React from 'react'
import { Link } from 'react-router'

export default () => {
  return (
  <div className='boxed-view'>
    <div className='boxed-view__box'>
      <h2>Not Found!</h2>
      <p>Unable to find page</p>
      <Link to='/' className='button button--link'>Back Home</Link>
    </div>
  </div>
)
}
