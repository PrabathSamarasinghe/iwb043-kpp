import React from 'react'
import './login_user.css'
import 'boxicons'
import { Link } from 'react-router-dom';
const login_user = () => {
  
  return (
    <>
      <main>
      <div className='login'>
        <i className='bx bxs-user-circle'></i>
        <h3 className='heading'>USER LOGIN</h3>
        
        <form>
          <div className="form-group">
            <i className='bx bxs-user'></i>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='email'/>
          </div>
          <div className="form-group">
            <i className='bx bxs-lock-alt'></i>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='password'/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>

          <p className="signup-link">
            Don't have an account? <Link to="/prabath/signup_user">Sign up</Link>
          </p>
        </form>
      </div>
      </main>
    </>
  );
}

export default login_user
