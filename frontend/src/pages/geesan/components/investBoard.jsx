import React from 'react'
import './investboard.css'
export const InvestBoard = () => {
  return (
    <div className='mainContainer'>
        <h1>Your Investments</h1>
        <div className='box'>
            <h2>Fixed Deposites</h2>
            <div className='subBoard'>
            </div>
        </div>
        <div className='box'>
        <h2>Savings Deposites</h2>
        <div className='subBoard'>
        </div>
        </div>
    </div>
  )
}
