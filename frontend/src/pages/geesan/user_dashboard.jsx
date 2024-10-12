import React from 'react'
import Ribbon from './components/Ribbon'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <Ribbon />
      <div className='mainContainer'>
        <h1>Your Investments</h1>
      </div>
    </div>
  )
}

export default Dashboard
