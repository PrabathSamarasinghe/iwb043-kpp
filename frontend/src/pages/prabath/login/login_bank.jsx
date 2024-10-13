import React from 'react'
import './login.css'
import 'boxicons'
import { Link } from 'react-router-dom';
const login_bank = () => {
  return (
    <>
      <main>
      <div className='login'>
        <i class='bx bxs-bank'></i>
        <h3 className='heading'>BANK LOGIN</h3>
        
        <form>
          <div className="form-group">
            <i className='bx bxs-user'></i>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email'/>
          </div>
          <div className="form-group">
            <i className='bx bxs-lock-alt'></i>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='password'/>
          </div>
          <div class="custom-control custom-checkbox mb-3">
              <input type="checkbox" class="custom-control-input" id="customControlValidation1" />
              <label class="custom-control-label" for="customControlValidation1">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>

          <p className="signup-link">
            Don't have an account? <Link to="/prabath/signup_user">Sign up</Link>
          </p>
        </form>
      </div>
      </main>
    </>
  )
}

export default login_bank
