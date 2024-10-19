import React, { useEffect, useState } from 'react'
import './components.css'

function SD_Modal({dcloseModal,s_dep_id}) {
  const [data, setdata] = useState({});
  const [confirmed, setconfirmed] = useState(false);
  const url = "http://localhost:9090/GetFixedDeposite";

  useEffect(() => {
    // Simulate fetching data or initializing state
    setdata({
      "product_name": "High Interest Savings Deposit",
      "bank_name": "National Bank",
      "period": 12,
      "s_dep_ID": 123456,
      "amount": 100000.50,
      "date_of_deposite": "2024-10-20",
      "username": "johndoe",
      "NIC": "123456789V",
      "full_name": "John Doe",
      "gender": "Male",
      "birthday": "1990-01-01",
      "address": "123 Main St, Colombo",
      "phone_number": "0712345678",
      "e_mail": "johndoe@example.com"
    });
  }, []);

  const handleConfirm = () => {
    setconfirmed(true);
    // Optionally, you can add more logic here when confirmed
  };

  return (
    <div className='modalBackground'>
      <div className='model_main'>
        <div className='modalContainer'>
          <div className='mm_titleCloseBtn'>
            <button className='manu__btn' onClick={() => dcloseModal(false)}>X</button>
          </div>
          <div className='body'>
            <h3>Deposit ID: {s_dep_id}</h3>
            <div className='details-grid'>
              <div className='details-left'>
                <dt>Product Name:</dt>
                <dd>{data.product_name}</dd>
                <dt>Bank Name:</dt>
                <dd>{data.bank_name}</dd>
                <dt>Period (Months):</dt>
                <dd>{data.period}</dd>
                <dt>Savings Deposit ID:</dt>
                <dd>{data.s_dep_ID}</dd>
              </div>

              <div className='details-middle'>
                <dt>Amount:</dt>
                <dd>Rs.{data.amount}</dd>
                <dt>Date of Requst:</dt>
                <dd>{data.date_of_deposite}</dd>
                <dt>Username:</dt>
                <dd>{data.username}</dd>
                <dt>NIC:</dt>
                <dd>{data.NIC}</dd>
                </div>
              <div className='details-right'>
                <dt>Full Name:</dt>
                <dd>{data.full_name}</dd>
                <dt>Gender:</dt>
                <dd>{data.gender}</dd>
                <dt>Birthday:</dt>
                <dd>{data.birthday}</dd>
                <dt>Address:</dt>
                <dd>{data.address}</dd>
                <dt>Phone Number:</dt>
                <dd>{data.phone_number}</dd>
                <dt>Email:</dt>
                <dd>{data.e_mail}</dd>
                
              </div>
            </div>


            <div className='footer'>
              {!confirmed && (
                <button
                  type="button"
                  className="m_btn btn-primary"
                  id='confirmBtn'
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SD_Modal
