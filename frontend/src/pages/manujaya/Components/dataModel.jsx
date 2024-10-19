import React, { useState } from 'react'
import './components.css'

function D_Modal({dcloseModal,f_dep_id}) {
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
  }
  return (
    <div  className='modalBackground'>
      <div className='model_main'>
      <div className='modalContainer'>
        <div className='mm_titleCloseBtn'>
          <button className='manu__btn' onClick={()=>dcloseModal(false)}>X</button>
        </div>
        <div className='body'>
        <h1>Desposite_ID: {f_dep_id}</h1>
        <div className='footer'>
        <button type="button" className="m_btn btn-primary" id='cancelBtn' data-dismiss="modal" onClick={()=>dcloseModal(false)}>Close</button>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default D_Modal
