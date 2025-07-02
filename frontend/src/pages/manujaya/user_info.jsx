import React from 'react';
import './Components/components.css';


const Login_info = () => {
  return (
    <main>
      <div className='signupdiv'>
        <div className='headimg'>
        <i class='bx bxs-user' ></i>
        </div>
        <h3 className='heading'>USER INFORMATIONS</h3>
        <form className="needs-validation" noValidate>
          
        <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">NIC</label>
              <input type="text" className="form-control" id="validationCustom06" placeholder="NIC" required />
              <div className="invalid-feedback">
                Please provide the NIC.
              </div>
            </div>
           </div> 
          
          
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom01">Full Name</label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="Full Name" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>

           <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Gender</label>
              <input type="text" className="form-control" id="validationCustom06" placeholder="Gender" required />
              <div className="invalid-feedback">
                Please provide your Gender.
              </div>
            </div>
           </div>  
          </div>
          
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">Birth Day</label>
              <input type='date' className="form-control" id="validationCustom03" placeholder="Address" required />
              <div className="invalid-feedback">
                Please provide the Address.
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">Address</label>
              <input type="text" className="form-control" id="validationCustom03" placeholder="Address" required />
              <div className="invalid-feedback">
                Please provide the Address.
              </div>
            </div>
            
            
          </div>
          
          <div className="form-row">
          <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Phone number</label>
              <input type="number" className="form-control" id="validationCustom06" placeholder="Phone number" required />
              <div className="invalid-feedback">
                Please provide a valid ID.
              </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">E-mail</label>
                <input type="email" className="form-control" id="validationCustom06" placeholder="E-mail" required />
                <div className="invalid-feedback">
                  Please provide your e-mail.
                </div>
            </div>
            </div>
          
          
          

          
          </div>

          
          

          

          </form>
        <div className="acknowledgement">
          <p>Here Are The Details!.</p>
        </div>
      </div>
    </main>
  )
}

export default Login_info;
