import React, { useState } from 'react';
import './components.css';
function Form(){
  const [userId, setUserId] = useState('');

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`User ID submitted: ${userId}`);
  };
    return(
<form className="form-inline">
  
  <div className="enter">
  <label htmlFor="userId">User ID:</label>
    <input type="text"
          id="userId"
          name="userId"
          className="form-control"
          value={userId}
          onChange={handleInputChange}
          placeholder="Enter your User ID"
          required
          pattern="[A-Za-z0-9]{6,12}"
          />
  </div>
  <button  type="submit" className="btn">Get User Info</button>
</form>
    );
}
export default Form;