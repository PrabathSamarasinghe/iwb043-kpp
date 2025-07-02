import React, { useState } from 'react';
import './requestcard.css';
import Details from './details';

const RequestCard = ({ product }) => {

  const [boolean, setBoolean] = useState(false);

  const popdetails = () => {
    setBoolean(!boolean);
  };

  const closedetails = () => {
    setBoolean(false);
  }
  return (
    <>
      <div className="request">
        <div className='namebox'>
          <h3>{product.fullName}</h3>
        </div> 
        <div className="btnbox">
          <button className="viewbtn" onClick={popdetails}>View</button>
          <button className="delbtn">Delete</button>
        </div>
      </div>

      {/* Conditionally render the Details component */}
      {boolean && <Details product={product} closedetails = {closedetails}/>} 
    </>
  );
};

export default RequestCard;
