import React , {useState} from 'react'
import './dash.css'
import Card from './component/requestcard'
const admin_dash = () => {
  const [formdata, setFormdata] = useState([{
    firstName: 'Prabath', 
    lastName: 'Samarasinghe',
    address: 'Millawa, Horana',
    dob: '2001-03-10',
    nic: '200001234567',
    email: 'ad@gmail.com',
    username: 'Appu',
    phone: '0702254520',
    home: '0452178632',
    gender: 'Male', 
    },
    {
      firstName: 'Kasun', 
      lastName: 'Perera',
      address: 'Millawa, Horana',
      dob: '2001-03-10',
      nic: '200001234567',
      email: 'asda@gmail.com',
      username: 'alumadoluma',
      phone: '0702254520',
      home: '0452178632',
      gender: "Male",
    }
  ]);
  const[products, setProducts] = useState(formdata);



  return (
    <main>
        <div className='side'>      
            <div className='stside'>
              <h2 className='topic'>Bank Admin Request</h2>
                <div className='sside'>
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
                </div>
              </div>
              <div className='stside'>
              <h2 className='topic'>User Request</h2>
                <div className='sside'>
                {products.map((product, index) => (
                  <Card key={index} product={product} />
                ))}  
                </div>
              </div>
        </div>
    </main>
  )
}

export default admin_dash
