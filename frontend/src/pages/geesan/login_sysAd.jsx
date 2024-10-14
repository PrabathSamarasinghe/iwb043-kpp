import React from 'react'
import { useState } from 'react';
import 'boxicons'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth';

const Login_sys_admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function submit (event){
    event.preventDefault();
    //post the username password to the backend
    
    const payload = {username : username, password : password};
    const url = "/CheckSysAdmin";
    try {
      const response = await axiosInstance.post(url, payload); // Use the custom Axios instance
      console.log('Response data:', response.data);
      localStorage.setItem('authToken', response.data);// Handle the response data
      navigate("/geesan/sysAd_dashboard");
      // Handle the response (e.g., show a success message)
    } catch (error) {
      alert("Invalid username or password");
      // Handle the error (e.g., show an error message)
    }
  }
  return (
    <>
      <main>
      <div className='login'>
        <i className='bx bxs-user-circle'></i>
        <h3 className='heading'>System Admin LOGIN</h3>
        
        <form onSubmit={submit}>
          <div className="form-group">
            <i className='bx bxs-user'></i>
            <input type="username" className="form-control" id="exampleInputUsername1" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="form-group">
            <i className='bx bxs-lock-alt'></i>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
      </main>
    </>
  );
}
 

export default Login_sys_admin
