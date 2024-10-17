import Ribbon from './components/Ribbon'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NotVerified from './components/NotVerified';
import { InvestBoard } from './components/investBoard';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [verified, setData] = useState(null);
  const url = 'http://localhost:9090/User/verified';

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchVerificationStatus = async () => {
      try {
        const response = await axios.get(url,{withCredentials:true});
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        navigate("/prabath/login_user"); // Navigate on error
      }
    };

    // Call the async function
    fetchVerificationStatus();
  }, [navigate]); // Add navigate as a dependency

  return (
    <div>
      <Ribbon />
      {verified ? <InvestBoard /> : <NotVerified />}
    </div>
  );
};

export default Dashboard
