import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Components/product';
import Form from './Components/Form';
import Button from './Components/Button';
import F_Modal from './Components/Fixed_Modal';
import S_Modal from './Components/Saving_Modal';
import './bank_admin.css';
import { productData, responsive } from './data';
import { useState } from 'react';
import SysAd_dashboard from '../geesan/sysAd_dashboard';
function bank_admin(){
    const[OpenModal,setOpenModal]=useState(false);
     const product= productData.map(item=> (<Product name={item.name} number_of_invesments={item.number_of_invesments} discription={item.discription} />));
    return(<div className='bank_admin'>
      <div className='mcenter'><h1 className='mtopic'>Bank List</h1></div>
      <Carousel showDots={true} responsive={responsive}>
        
        {product}
        
        
      </Carousel><hr /><Form></Form><hr />
     <div className='mopen'>
<button className="mmbtn" onClick={()=>{setOpenModal(true);}}>Update Fixed Product Interest Rates</button>
</div> 
     {OpenModal && <F_Modal closeModal={setOpenModal}/>}
     <hr />
     <div className='mmopen'>
<button className="mmmbtn" onClick={()=>{setOpenModal(true);}}>Update Saving Product Interest Rates</button>
</div> 
     {OpenModal && <S_Modal closeModal={setOpenModal}/>}
     <hr /></div>);
}
export default bank_admin;
