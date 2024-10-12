import React from 'react'
import Profile_dd from './Profile_dd'
import './ribon.css'

const Ribbon = () => {
  return (
    <div>
        <div className='rib'>
            <div className='dbHeader'>
                <h1>Dashboard</h1>
            </div>
            <div className='dButton'>
                <Profile_dd />
            </div>
        </div>
    </div>
  )
}

export default Ribbon