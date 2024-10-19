import React from 'react';
import './cards.css'; // Import the CSS file
import logo from "/public/logo.jpg";

const Confirmed_savings = ({ depositId, requestedDate, period, amount, bank, productName}) => {
  return (
    <div className="some_card conf">
       <h6>Deposite_ID : {depositId}</h6>
       <img src={logo} alt="Card Image" className="card_image" />
       <p><h7 className='card_fieldName'>Product:</h7> : {productName}</p>
       <p><h7 className='card_fieldName'>Requested Date</h7> : {requestedDate}</p>
       <p><h7 className='card_fieldName'>Period :</h7> {period} months</p>
       <p><h7 className='card_fieldName'>Amount :</h7> Rs. {amount}</p>
       <p><h7 className='card_fieldName'>Bank :</h7> {bank}</p>
       <p className='card_typedef'>Confirmed</p>
    </div>
  );
};

export default Confirmed_savings;
