import React, { useEffect, useState } from 'react'
import './dash.css'
import Card from './component/requestcard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const admin_dash = () => {
  const navigate = useNavigate();
  const [name, setData] = useState(null);
  const url = 'http://localhost:9090/SysAdmin/name';
  
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchName = async () => {
      try {
        const response = await axios.get(url,{withCredentials:true});
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        navigate("/prabath/login_admin"); // Navigate on error
      }};

    // Call the async function
    fetchName();
  }, [navigate]);
  return (
    <main>
        <div className='side'>
            <h1> Hi {name}  </h1>
            <div className='stside'>
              <h2 className='topic'>Bank Request</h2>
                <div className='sside'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    
                </div>
              </div>
              <div className='stside'>
              <h2 className='topic'>User Request</h2>
                <div className='sside'>
                    <Card />      
                </div>
              </div>
        </div>
    </main>
  )
}

export default admin_dash
