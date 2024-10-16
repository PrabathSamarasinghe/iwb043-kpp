import React from 'react'
import './dash.css'
import Card from './component/requestcard'
const admin_dash = () => {
  return (
    <main>
        <div className='side'>
            <div className='stside'>
              <h2 className='topic'>Bank Request</h2>
                <div className='sside'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    
                </div>
              </div>
              <div className='stside'>
              <h2 className='topic'>User Request</h2>
                <div className='sside'>
                    <Card />      
                </div>
              </div>
        </div>
    </main>
  )
}

export default admin_dash
