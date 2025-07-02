import React , {useState, useEffect} from 'react'
import './dash.css'
import axios from 'axios'
import Card from './component/requestcard'

const admin_dash = () => {
  useEffect(() => {
    fetchUsers();
    fetchBankAdmins();
    }, []);

  const[users, setUSers] = useState([]); 
  const[banks, setBanks] = useState([]); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9090/NonVerifiedUsers", {
        withCredentials: true
      });
      setUSers(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const fetchBankAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:9090/NonVerifiedBankAdmins", {
        withCredentials: true
      });
      setBanks(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

  return (
    <main>
        <div className='side'>      
            <div className='stside'>
              <h2 className='topic'>Bank Admin Request</h2>
                <div className='sside'>
                {users.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                </div>
              </div>
              <div className='stside'>
              <h2 className='topic'>User Request</h2>
                <div className='sside'>
                {banks.map((product, index) => (
                  <Card key={index} product={product} />
                ))}  
                </div>
              </div>

        </div>
    </main>
  )
}

export default admin_dash
