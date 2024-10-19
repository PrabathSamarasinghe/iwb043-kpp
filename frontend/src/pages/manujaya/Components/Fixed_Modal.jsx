import React, { useState } from 'react'
import './components.css'
function F_Modal({closeModal}) {


  // State to hold user inputs
  const [inputData, setInputData] = useState({f_ID:'',interestRate:''});
  
 const handleChange = (event)=>{
  setInputData({
      ...inputData,
      [event.target.name]:event.target.value
  });
 };
   //Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form reload
    console.log('Fixed Product ID:', inputData.f_ID);
    console.log('Interest Rate:', inputData.interestRate);
  };

  return (
    <div  className='modalBackground'>
      <div className='model_main'>
      
      <div className='modalContainer'>
        <div className='mm_titleCloseBtn'>
          <button className='manu__btn' onClick={()=>closeModal(false)}>X</button>
        </div>
        <div className='mtitle'>
          <h3>Update the Interest Rates of Fixed Products</h3>
        </div>
        <div className='body'>
        <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Fixed Product ID</label>
    <div class="col-sm-10">
      <input type="number" 
      class="form-control" 
      id="inputF_ID" 
      placeholder="F_ID"
      name="f_ID"
      value={inputData.f_ID}
     onChange={handleChange} 
     />
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Interest Rate</label>
    <div class="col-sm-10">
      <input type="number" 
      class="form-control" 
      id="inputrate" 
      placeholder="Rate(in %)"
      name='interestRate'
      value={inputData.interestRate}
      onChange={handleChange}
      />
    </div></div>
    </form>
  </div>
        
        <div className='footer'>
        <button type="button" className="m_btn btn-primary" onClick={handleSubmit}>Update changes</button>
        <button type="button" className="m_btn btn-primary" id='cancelBtn' data-dismiss="modal" onClick={()=>closeModal(false)}>Close</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default F_Modal
