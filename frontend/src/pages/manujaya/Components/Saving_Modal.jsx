import React from 'react'
import './components.css'
function S_Modal({closeModal}) {
  return (
    <div className='modalBackground'>
      
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button className='manubtn' onClick={()=>closeModal(false)}>X</button>
        </div>
        <div className='mtitle'>
          <h3>Update the Interest Rates of Saving Products</h3>
        </div>
        <div className='body'>
        <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Saving Product ID</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputF_ID" placeholder="S_ID"/>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Interest Rate</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputrate" placeholder="Rate(in %)"/>
    </div></div>
    </form>
  </div>
        
        <div className='footer'>
        <button type="button" class="btn btn-primary">Update changes</button>
        <button type="button" className="btn btn-primary" id='cancelBtn' data-dismiss="modal" onClick={()=>closeModal(false)}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default S_Modal
