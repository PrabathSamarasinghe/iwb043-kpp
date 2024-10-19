import React from 'react'
import bank_photo from '../images/Bank_original.jpg';
import './components.css';
export default function product(props) {
  
  return (
    
    <div>
      <div className='mcard'>
            <img className='mproduct--image' src={bank_photo} alt="Bank Photo" />
            <h2 className='mname'>{props.name}</h2>
            <h4 className='mhead'>Number of invesments</h4>
            <p className='mno_investments'>{props.number_of_invesments}</p>
            <p className='mdiscription'>{props.discription}</p>
       </div>
    </div>
  );
}
