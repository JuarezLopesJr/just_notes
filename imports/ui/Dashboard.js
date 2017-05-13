import React from 'react'
import PrivateHeader from './Private_Header'


export default () => {
  return (
    <div>
      <PrivateHeader title='Dashboard'  />
      <div className='page-content'>
        Dashboard page content
      </div>
    </div>
  )
}
