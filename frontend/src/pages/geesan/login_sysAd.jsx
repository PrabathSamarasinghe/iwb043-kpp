import React from 'react'
import { useState } from 'react';
import 'boxicons'
import { useNavigate } from 'react-router-dom';
const Login_sys_admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function submit(event){
    event.preventDefault();
    //post the username password to the backend
    
    const allow = () =>{
      navigate("/geesan/user_dashboard");
    }
    const payload = {username : username, password : password};
    const url = "http://localhost:9090/CheckSysAdmin";
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(payload)
      })
      .then(response => {
          if (!response.ok) {
              alert("wrong username or password");
              throw Error;
          }
          return response.text(); // Parse the response as JSON
      })
      .then(data => {
          console.log('Success:', data); // Handle the response data
          allow();
      })
      .catch((error) => {
          console.error('Error:', error); // Handle errors
      });
    //Get a token if possible
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
