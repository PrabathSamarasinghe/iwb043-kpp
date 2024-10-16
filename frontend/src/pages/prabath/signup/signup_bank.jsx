import React from 'react'
import './signup.css'

const signup_bank = () => {
  return (
    <main>
      <div className='signupdiv'>
      <div className='headimg'>
      <i class='bx bxs-bank'></i>
      </div>
        
        <h3 className='heading'>BANK SIGNUP</h3>
        <form className="needs-validation" noValidate>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom01">Bank Name</label>
              <input type="text" className="form-control" id="validationCustom01" placeholder="Bank Name" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom02">Branch</label>
              <input type="text" className="form-control" id="validationCustom02" placeholder="Branch" required />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom03">City</label>
              <input type="text" className="form-control" id="validationCustom03" placeholder="City" required />
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom04">State</label>
              <select className="custom-select" id="validationCustom04" required>
                <option selected disabled value="">Choose...</option>
                <option>West</option>
                <option>East</option>
                <option>North</option>
                <option>South</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="validationCustom05">Zip Code</label>
              <input type="text" className="form-control" id="validationCustom05" placeholder="Zip Code" required />
              <div className="invalid-feedback">
                Please provide a valid zip code.
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Bank ID</label>
              <input type="text" className="form-control" id="validationCustom06" placeholder="Bank ID" required />
              <div className="invalid-feedback">
                Please provide a valid ID.
              </div>
            </div>
          </div>
          
          <div className="custom-file mb-3">
            <input type="file" className="custom-file-input" id="validatedCustomFile" required />
            <label className="custom-file-label" htmlFor="validatedCustomFile">Uplaod a picture of your registration from</label>
            <div className="invalid-feedback">Please upload a file.</div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">email</label>
                <input type="email" className="form-control" id="validationCustom06" placeholder="email" required />
                <div className="invalid-feedback">
                  Please provide a valid ID.
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">username</label>
                <input type="text" className="form-control" id="validationCustom06" placeholder="username" required />
                <div className="invalid-feedback">
                  Please provide a valid ID.
                </div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">Password</label>
                <input type="password" className="form-control" id="validationCustom06" placeholder="password" required />
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <label htmlFor="validationCustom06">Re enter password</label>
                <input type="password" className="form-control" id="validationCustom06" placeholder="Re enter password" required />
                <div className="invalid-feedback">
                  These two are not matching.
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

          <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Home number</label>
              <input type="number" className="form-control" id="validationCustom06" placeholder="Home number" required />
              <div className="invalid-feedback">
                Please provide a valid ID.
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

export default signup_bank
