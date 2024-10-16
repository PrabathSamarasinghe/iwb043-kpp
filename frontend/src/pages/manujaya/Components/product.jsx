import React from 'react'
import bank_photo from '../images/Bank_original.jpg';
import './components.css';
export default function product(props) {
  
  return (
    
    <div className='card'>
            <img className='product--image' src={bank_photo} alt="Bank Photo" />
            <h2 className='mname'>{props.name}</h2>
            <h4 className='head'>Number of invesments</h4>
            <p className='no_investments'>{props.number_of_invesments}</p>
            <p className='mdiscription'>{props.discription}</p>
        </div>
  );
}
