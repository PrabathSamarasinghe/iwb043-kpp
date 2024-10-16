import React from 'react'
import './requestcard.css'
const requestcard = (product) => {
  return (
    <div className="request">
      <h3>name</h3>
      <div className='btnbox'>
        <button className='accbtn'>Accept</button>
        <button className='delbtn'>Delete</button>
      </div>
    </div>
  )
}

export default requestcard
