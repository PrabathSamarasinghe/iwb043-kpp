import React, { useState } from 'react';
import './components.css';
//import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Form(){
 // const handleSubmit = (event) => {
   // event.preventDefault();
    // Navigate to user_info page
    //navigate('./user_info'); // Replace with your actual route
//};
const navigate=useNavigate();
    return(
<form className="form-inline">
  
  <div className="menter">
  <label htmlFor="userId">User ID:</label>
    <input type="text"
          id="userId"
          name="userId"
          className="form-control"
          //value={userId}
         // onChange={handleInputChange}
          placeholder="Enter your User ID"
          required
          pattern="[A-Za-z0-9]{6,12}"
          />
  </div>
 <div><button  type="submit" className="mmmmbtn" onClick={()=>navigate('/manujaya/user_info')}>Get User Info</button></div> 
</form>
    );
}
export default Form;
