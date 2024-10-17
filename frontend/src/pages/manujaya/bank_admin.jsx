import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Components/product';
import Form from './Components/Form';
import Button from './Components/Button';
import F_Modal from './Components/Fixed_Modal';
import S_Modal from './Components/Saving_Modal';
import './bank_admin.css';
import { productData, responsive } from './data';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function bank_admin() {
     const navigate = useNavigate();
     const [bankID, setData] = useState(null);
     const url = 'http://localhost:9090/BankAdmin/bankID';
     useEffect(() => {
          // Define the async function inside useEffect
          const fetchBankID = async () => {
               try {
                    const response = await axios.get(url, { withCredentials: true });
                    setData(response.data);
                    console.log(response.data);
               } catch (error) {
                    console.log(error);
                    navigate("/prabath/login_bank"); // Navigate on error
               }
          };
          // Call the async function
          fetchBankID();
     }, [navigate]); // Add navigate as a dependency
     const logout = async () =>{
          const url = 'http://localhost:9090/Logout';
          const response = await axios.get(url,{ withCredentials: true });
          console.log(response);
          navigate("/");
     }
     const [OpenModal, setOpenModal] = useState(false);
     const product = productData.map(item => (<Product name={item.name} number_of_invesments={item.number_of_invesments} discription={item.discription} />));
     return (
          <main>
               <h1>ID: {bankID}</h1>
               <div className='bank_admin'>
                    <div className='mcenter'><h1 className='mtopic'>Bank List</h1></div>
                    <button onClick={logout}> Logout </button>
                    <Carousel showDots={true} responsive={responsive}>

                         {product}


                    </Carousel><hr /><Form></Form><hr />
                    <div className='mopen'>
                         <button className="mmbtn" onClick={() => { setOpenModal(true); }}>Update Fixed Product Interest Rates</button>
                    </div>
                    {OpenModal && <F_Modal closeModal={setOpenModal} />}
                    <hr />
                    <div className='mmopen'>
                         <button className="mmmbtn" onClick={() => { setOpenModal(true); }}>Update Saving Product Interest Rates</button>
                    </div>
                    {OpenModal && <S_Modal closeModal={setOpenModal} />}
                    <hr />
               </div>
          </main>
     );
}
export default bank_admin;
