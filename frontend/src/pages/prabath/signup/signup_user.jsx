import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
const SignupUser = () => {
  const [formdata, setFormdata] = useState({
    full_name: '', 
    address: '',
    birthday: '',
    NIC: '',
    e_mail: '',
    username: '',
    password: '',
    repassword: '',
    phone_number: '',
    home: '',
    gender: '', 
  });

  const [FullName, setFullName] = useState({
    firstName: '',
    lastName: '',
  });
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value, 
    });
    setFullName({
      ...FullName,
      [e.target.name]: e.target.value,
    });
    formdata.full_name = FullName.firstName + ' ' + FullName.lastName;
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Form Data Submitted:', formdata);
    try {
      const response = await axios.post('http://localhost:9090/SignupUser', formdata);
      console.log(response.data); // For debugging
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };
  
  return (
    <main>
      <div className='signupdiv'>
        <div className='headimg'>
          <i className='bx bxs-user'></i>
        </div>
        <h3 className='heading'>USER SIGNUP</h3>
        <form className="needs-validation" noValidate onSubmit={handleSubmit}> {/* onSubmit handler here */}
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom01">First Name</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                name="firstName"  // Added name attribute
                placeholder="First Name"
                required
                value={FullName.firstName}
                onChange={handleChange}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom02">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom02"
                name="lastName"  // Added name attribute
                placeholder="Last Name"
                required
                value={FullName.lastName}
                onChange={handleChange}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>

          <div className="form-row">
            <div className='w-100 p-1'>
              <label htmlFor="validationCustom03">Address</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom03"
                name="address"  // Added name attribute
                placeholder="Address"
                required
                value={formdata.address}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid address.</div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">NIC</label>
              <input
                type="text"
                className="form-control"
                id="validationCustom06"
                name="NIC"  // Added name attribute
                placeholder="NIC"
                required
                value={formdata.NIC}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid ID.</div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom07">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="validationCustom07"
                name="birthday"  // Added name attribute
                required
                value={formdata.birthday}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid date of birth.</div>
            </div>
          </div>

          {/* Gender section */}
          <div className='gender'>
            <div className="custom-control custom-radio">
              <input
                type="radio"
                className="custom-control-input"
                id="customControlValidation2"
                name="gender"
                value="Male"  // Added value and name for gender
                onChange={handleChange}
                required
              />
              <label className="custom-control-label" htmlFor="customControlValidation2">Male</label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                type="radio"
                className="custom-control-input"
                id="customControlValidation3"
                name="gender"
                value="Female"  // Added value and name for gender
                onChange={handleChange}
                required
              />
              <label className="custom-control-label" htmlFor="customControlValidation3">Female</label>
              <div className="invalid-feedback">Please select your gender.</div>
            </div>
          </div>

          {/* Other form fields with correct name attributes */}
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Email</label>
              <input
                type="email"
                className="form-control"
                id="validationCustomEmail"
                name="e_mail"  // Added name attribute
                placeholder="Email"
                required
                value={formdata.e_mail}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid email.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustom06">Username</label>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                name="username"  // Added name attribute
                placeholder="Username"
                required
                value={formdata.username}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid username.</div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustomPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="validationCustomPassword"
                name="password"  // Added name attribute
                placeholder="Password"
                required
                value={formdata.password}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid password.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustomRepassword">Re-enter Password</label>
              <input
                type="password"
                className="form-control"
                id="validationCustomRepassword"
                name="repassword"  // Added name attribute
                placeholder="Re-enter Password"
                required
                value={formdata.repassword}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Passwords do not match.</div>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustomPassword">Phone _number</label>
              <input
                type="text"
                className="form-control"
                id="validationCustomphone"
                name="phone_number"  // Added name attribute
                placeholder="Phone number"
                required
                value={formdata.phone_number}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Please provide a valid Phone number.</div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="validationCustomRePhonenumber">Home number</label>
              <input
                type="text"
                className="form-control"
                id="validationCustomhome"
                name="home"  // Added name attribute
                placeholder="Home number"
                required
                value={formdata.home}
                onChange={handleChange}
              />
              <div className="invalid-feedback">Passwords do not match.</div>
            </div>
          </div>
          

          <div className="custom-control custom-checkbox mb-3">
            <input type="checkbox" className="custom-control-input" id="customControlValidation1" required />
            <label className="custom-control-label" htmlFor="customControlValidation1">I confirm that all my details are accurate and correct</label>
            <div className="invalid-feedback">Please confirm your details.</div>
          </div>

          <button className="btn btn-primary" type="submit">Submit Form</button> {/* type="submit" */}
        </form>
        <div className="acknowledgement">
          <p>Thank you for signing up! We will get back to you shortly.</p>
        </div>
      </div>
    </main>
  );
}

export default SignupUser;
