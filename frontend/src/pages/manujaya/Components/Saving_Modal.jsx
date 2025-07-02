import React, { useState } from 'react'
import './components.css'

function S_Modal({scloseModal}) {
  // State to hold user inputs
  const [s_inputData, s_setInputData] = useState({s_ID:'',interestRate:''});
  
 const s_handleChange = (event)=>{
  s_setInputData({
      ...s_inputData,
      [event.target.name]:event.target.value
  });
 };
   //Function to handle form submission
  const s_handleSubmit = (event) => {
    event.preventDefault(); // Prevent form reload
    console.log('Saving Product ID:', s_inputData.s_ID);
    console.log('Interest Rate:', s_inputData.interestRate);}
  return (
    <div  className='modalBackground'>
      <div className='model_main'>
      
      <div className='modalContainer'>
        <div className='mm_titleCloseBtn'>
          <button className='manu__btn' onClick={()=>scloseModal(false)}>X</button>
        </div>
        <div className='mtitle'>
          <h3>Update the Interest Rates of Saving Products</h3>
        </div>
        <div className='body'>
        <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Saving Product ID</label>
    <div class="col-sm-10">
      <input type="number" 
      class="form-control" 
      id="inputF_ID" 
      placeholder="S_ID"
      name="s_ID"
      value={s_inputData.s_ID}
      onChange={s_handleChange} />
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
      value={s_inputData.interestRate}
      onChange={s_handleChange}/>
    </div></div>
    </form>
  </div>
        
        <div className='footer'>
        <button type="button" class="m_btn btn-primary"onClick={s_handleSubmit}>Update changes</button>
        <button type="button" className="m_btn btn-primary" id='cancelBtn' data-dismiss="modal" onClick={()=>scloseModal(false)}>Close</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default S_Modal
