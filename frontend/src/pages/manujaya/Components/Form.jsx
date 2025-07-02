import React, { useState } from 'react';
import './components.css';
//import { useNavigate } from 'react-router-dom';
function Form({setData,setOpen,type}){
    const [f_dep_ID,set_f_dep_id] = useState(null);
    const handleSubmit = (e)=>{
      e.preventDefault()
      setData(f_dep_ID);
      setOpen(true);
    }
    return(
<form className="form-inline" onSubmit={handleSubmit}>
  
  <div className="menter">
  <label htmlFor="F_dep_Id">{type} Deposite ID:</label>
    <input type="number"
          id="userId"
          name="userId"
          value={f_dep_ID}
          className="form-control"
          onChange={(e)=>{set_f_dep_id(e.target.value)}}
          placeholder={`${type} Deposite ID`}
          required
          />
  </div>
 <div><button  type="submit" className="button mmbtn">Get User Info</button></div> 
</form>
    );
}
export default Form;
