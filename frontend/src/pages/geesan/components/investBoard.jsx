import React from 'react'
import './investboard.css'
import Confirmed_fixed from './confirmed_fixed'
import Unconfirmed_fixed from './unconfirmed_fixed'
import Unconfirmed_savings from './unconfirmed_savings'
import Confirmed_savings from './confirmed_savings'
import Fixed_new from './fixed_new'
import Savings_new from './savings_new'

export const InvestBoard = () => {
  return (
    <div className='mainContainer'>
        <h1>Your Investments</h1>
        <div className='box'>
            <h2>Fixed Deposites</h2>
            <div className='subBoard'>
              <Unconfirmed_fixed/>
              <Unconfirmed_fixed/>
              <Unconfirmed_fixed/>
              <Fixed_new/>
            </div>
            <div className='subBoard'>
              <Confirmed_fixed/>
              <Confirmed_fixed/>
              <Confirmed_fixed/>
              <Confirmed_fixed/>
            </div>
        </div>
        <div className='box'>
        <h2>Savings Deposites</h2>
        <div className='subBoard'>
          <Unconfirmed_savings/>
          <Unconfirmed_savings/>
          <Savings_new/>
        </div>
        <div className='subBoard'>
          <Confirmed_savings/>
          <Confirmed_savings/>
          <Confirmed_savings/>
        </div>
        </div>
    </div>
  )
}
