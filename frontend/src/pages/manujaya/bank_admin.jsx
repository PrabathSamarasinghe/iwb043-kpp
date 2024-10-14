import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Product from './Components/product';
import Form from './Components/Form';
import { productData, responsive } from './data';
function bank_admin(){
    
     const product= productData.map(item=> (<Product name={item.name} number_of_invesments={item.number_of_invesments} discription={item.discription} />));
    return(<div className='bank_admin'>
      <h1 className='topic'>Bank List</h1>
      <Carousel showDots={true} responsive={responsive}>
        
        {product}
        
        
      </Carousel><Form></Form></div>);
}
export default bank_admin;
