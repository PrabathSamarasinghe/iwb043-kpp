import Ribbon from './components/Ribbon'
import React, { useState } from 'react'
import axiosInstance from '../auth';
import { useNavigate } from 'react-router-dom';
import NotVerified from './components/NotVerified';
import { InvestBoard } from './components/investBoard';

const Dashboard = () => {
  const navigate = useNavigate();
    //Check for token
    let token = localStorage.getItem('authToken');
    if (token) {
    console.log('Token found:', token);
    // Proceed with your logic (e.g., making a request)
    } else {
    console.error('No token found in local storage.');
    // Handle the absence of the token (e.g., redirect to login, show a message, etc.)
    }
    const [verified, setData] = useState(null);
    const init = async() => {
        const url = '/User/verified';
        try{
            const response = await axiosInstance.get(url);
            setData(response.data);
            console.log(response.data);
        }
        catch{
            navigate("/geesan/login_user");
        }
    }
    init();
    return (
    <div>
      <Ribbon />
      {verified ? <InvestBoard /> : <NotVerified />}
    </div>
  )
}

export default Dashboard
