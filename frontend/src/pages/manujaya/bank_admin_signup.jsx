import React from 'react'
import './bank_admin.css'

const bank_admin_signup = () => {
  return (
    <main>
      <div className='msignupdiv'>
        <i class='bx bxs-bank'></i>
        <h3 className='heading'>BANK ADMIN SIGNUP</h3>
        <form className="needs-validation" noValidate>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom01">Bank_ID</label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="Enter Your Bank ID" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom02">Branch Name</label>
              <input type="text" className="form-control" id="validationCustom02" placeholder="Enter Your Branch Name" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
          </div>
          
                
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Service Number</label>
              <input type="text" className="form-control" id="validationCustom06" placeholder="Enter Your Service Number" required />
              <div className="invalid-feedback">
                Please provide a valid ID.
              </div>
            </div>
          </div>
          
          

          <div className="form-row">
            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">User Name</label>
                <input type="text" className="form-control" id="validationCustom06" minlength="5" maxlength="15" placeholder="Enter Your Username" required />
                <div className="invalid-feedback">
                  Please provide a valid Username.
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">Confirm User Name</label>
                <input type="text" className="form-control" id="validationCustom06" minlength="5" maxlength="15" placeholder="Confirm Your User Name" required />
                <div className="invalid-feedback">
                  Please reenter your User Name.
                </div>
            </div>
          </div>

          <div className="form-row">
          <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Password</label>
              <input type='password' className="form-control" id="validationCustom06" placeholder="Enter Your Password" required />
              <div className="invalid-feedback">
                Please provide a valid password.
              </div>
          </div>

          <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Re-Enter Password</label>
              <input type='password' className="form-control" id="validationCustom06" placeholder="Confirm Your Password" required />
              <div className="invalid-feedback">
                Please re-enter your password.
              </div>
          </div>
          </div>

          <div className="custom-control custom-checkbox mb-3">
            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required />
            <label className="custom-control-label" htmlFor="customControlValidation1">I confirm that all my details are accurate and correct</label>
            <div className="invalid-feedback">Please confirm your details.</div>
          </div>

          

          <button className="btn btn-primary" type="submit">Submit Form</button>
        </form>
        <div className="acknowledgement">
          <p>Thank you for signing up! We will get back to you shortly.</p>
        </div>
      </div>
    </main>
  )
}

export default bank_admin_signup;
