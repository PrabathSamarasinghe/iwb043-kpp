import React, { useState } from 'react'
import axiosInstance from '../auth';
import { useNavigate } from 'react-router-dom';

const SysAd_dashboard= () => {
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
    const [username, setData] = useState(null);
    const init = async() => {
        const url = '/SysAdmin/name';
        try{
            const response = await axiosInstance.post(url);
            setData(response.data);
            console.log(response.data);
        }
        catch{
            navigate("/geesan/login_sys_ad");
        }
    }
    init();
    return(<>
    <div>
        hi {username}
    </div>
        </>);
}

export default SysAd_dashboard