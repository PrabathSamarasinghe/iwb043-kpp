import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from './Components/product';
import Form from './Components/Form';

import F_Modal from './Components/Fixed_Modal';
import S_Modal from './Components/Saving_Modal';
import D_Modal from './Components/dataModel';
import SD_Modal from './Components/sdataModel';
import './bank_admin.css';
import { productData, responsive } from './data';
import { useState } from 'react';




function bank_admin() {

     const [OpenModal, setOpenModal] = useState(false);
     const [sOpenModal, ssetOpenModal] = useState(false);
     const [dOpenModel, dsetOpenModal] = useState(false);
     const [sdOpenModel, sdsetOpenModal] = useState(false);
     const [f_dep_id, set_f_dep_id] = useState(null);
     const [s_dep_id, set_s_dep_id] = useState(null);
     const product = productData.map(item => (<Product name={item.name} number_of_invesments={item.number_of_invesments} discription={item.discription} />));
     return (
          <main className='bankMain'>
               <div className='bank_admin'>
                    <div className='mcenter'><h1 className='mtopic'>Bank Stats</h1></div>
                    <div className='corbg'>
                    <Carousel showDots={true} responsive={responsive}>
                    {product}
                    </Carousel>
                    </div>
                    <hr />
                    <Form type="Fixed" setData={set_f_dep_id} setOpen={dsetOpenModal} />
                    <hr />
                    <Form type="Savings" setData={set_s_dep_id} setOpen={sdsetOpenModal} />
                    <hr />
                    <div className='mopen'>
                         <button className="button mmbtn" onClick={() => { setOpenModal(true); }}>Update Fixed Product<br></br> Interest Rates</button>
                         <button className="button mmbtn" onClick={() => { ssetOpenModal(true); }}>Update Saving Product<br></br> Interest Rates</button>
                    </div>
                    {OpenModal && <F_Modal closeModal={setOpenModal} />}
                    {sOpenModal && <S_Modal scloseModal={ssetOpenModal} />}
                    
               </div>
               <div>
                    {dOpenModel && <D_Modal dcloseModal={dsetOpenModal} f_dep_id={f_dep_id} />}
                    {sdOpenModel && <SD_Modal dcloseModal={sdsetOpenModal} s_dep_id={s_dep_id} />}
               </div>
          </main>

     );
}
export default bank_admin;
