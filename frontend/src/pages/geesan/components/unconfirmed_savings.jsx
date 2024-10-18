import React from 'react';
import './cards.css'; // Import the CSS file
import logo from "/public/logo.jpg";

const Unconfirmed_savings = () => {
  return (
    <div className="some_card">
       <h6>Deposite_ID : 121</h6>
       <img src={logo} alt="Card Image" className="card_image" />
       <p><h7 className='card_fieldName'>Requested Date</h7> : 2/3/2022</p>
       <p><h7 className='card_fieldName'>Amount :</h7> Rs. 100000</p>
       <p><h7 className='card_fieldName'>Bank :</h7> ABC</p>
       <p className='card_typedef'>Pending</p>
    </div>
  );
};

export default Unconfirmed_savings;
