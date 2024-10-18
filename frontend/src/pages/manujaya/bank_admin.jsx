import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Components/product';
import Form from './Components/Form';
import F_Modal from './Components/Fixed_Modal';
import S_Modal from './Components/Saving_Modal';
import './bank_admin.css';
import { productData, responsive } from './data';
import { useState } from 'react';

function bank_admin(){
     
    const[OpenModal,setOpenModal]=useState(false);
    const[sOpenModal,ssetOpenModal]=useState(false);
     const product= productData.map(item=> (<Product name={item.name} number_of_invesments={item.number_of_invesments} discription={item.discription} />));
    return(
    <main>
     <div className='bank_admin'>
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
<button className="mmmbtn" onClick={()=>{ssetOpenModal(true);}}>Update Saving Product Interest Rates</button>
</div> 
     {sOpenModal && <S_Modal scloseModal={ssetOpenModal}/>}
     <hr />
     </div>
    </main>
     );
}
export default bank_admin;
