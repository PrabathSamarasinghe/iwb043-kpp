import React from 'react'
import './investboard.css'
import Confirmed_fixed from './confirmed_fixed'
import Unconfirmed_fixed from './unconfirmed_fixed'
import Unconfirmed_savings from './unconfirmed_savings'
import Confirmed_savings from './confirmed_savings'
import Fixed_new from './fixed_new'
import Savings_new from './savings_new'

export const InvestBoard = () => {
  const sav_con_deposits = [
    {
      depositId: "121",
      requestedDate: "2/3/2022",
      period: "6",
      amount: "100000",
      bank: "ABC Bank",
      productName: "High-Interest Savings Plan",
    },
    {
      depositId: "122",
      requestedDate: "4/15/2022",
      period: "12",
      amount: "150000",
      bank: "XYZ Bank",
      productName: "Youth Savings Account",
    },
  ];
  
  const fix_con_deposits = [
    {
      depositId: "123",
      requestedDate: "3/4/2022",
      period: "12",
      amount: "200000",
      bank: "LMN Bank",
      productName: "Fixed Growth Deposit",
    },
    {
      depositId: "124",
      requestedDate: "5/10/2022",
      period: "24",
      amount: "300000",
      bank: "PQR Bank",
      productName: "Secure Fixed Deposit",
    },
  ];
  
  const sav_uncon_deposits = [
    {
      depositId: "125",
      requestedDate: "5/1/2022",
      amount: "50000",
      bank: "DEF Bank",
      productName: "Regular Savings Account",
    },
    {
      depositId: "126",
      requestedDate: "6/1/2022",
      amount: "70000",
      bank: "GHI Bank",
      productName: "Monthly Income Savings Account",
    },
  ];
  
  const fix_uncon_deposits = [
    {
      depositId: "127",
      requestedDate: "2/3/2022",
      period: "6",
      amount: "100000",
      bank: "JKL Bank",
      productName: "Special Fixed Deposit",
    },
    {
      depositId: "128",
      requestedDate: "3/4/2022",
      period: "12",
      amount: "200000",
      bank: "MNO Bank",
      productName: "Smart Fixed Deposit",
    },
    {
      depositId: "129",
      requestedDate: "5/1/2022",
      period: "3",
      amount: "50000",
      bank: "RST Bank",
      productName: "Flexi Fixed Deposit",
    },
  ];
  

  return (
    <div className='mainContainer'>
      <h1>Your Investments</h1>
  
      <div className='box'>
        <h2>Fixed Deposits</h2>
        <div className='subBoard'>
        {fix_uncon_deposits.map((deposit) => (
            <Unconfirmed_fixed 
              key={deposit.depositId} // Use depositId for a unique key
              depositId={deposit.depositId}
              requestedDate={deposit.requestedDate}
              period={deposit.period}
              amount={deposit.amount}
              bank={deposit.bank}
              productName={deposit.productName}
            />
          ))}
          <Fixed_new/>
        </div>
        <div className='subBoard'>
          {fix_con_deposits.map((deposit) => (
            <Confirmed_fixed 
              key={deposit.depositId} // Use depositId for a unique key
              depositId={deposit.depositId} 
              requestedDate={deposit.requestedDate} 
              period={deposit.period} 
              amount={deposit.amount} 
              bank={deposit.bank} 
              productName={deposit.productName} 
            />
          ))}
        </div>
      </div>
  
      <div className='box'>
        <h2>Savings Deposits</h2>
        <div className='subBoard'>
        {sav_uncon_deposits.map((deposit) => (
            <Unconfirmed_savings 
              key={deposit.depositId} // Use depositId for a unique key
              depositId={deposit.depositId}
              requestedDate={deposit.requestedDate}
              amount={deposit.amount}
              bank={deposit.bank}
              productName={deposit.productName}
            />
          ))}
          <Savings_new/>
        </div>
        <div className='subBoard'>
          {sav_con_deposits.map((deposit) => (
            <Confirmed_savings 
              key={deposit.depositId} // Use depositId for a unique key
              depositId={deposit.depositId} 
              requestedDate={deposit.requestedDate} 
              amount={deposit.amount} 
              bank={deposit.bank} 
              productName={deposit.productName} 
            />
          ))}
        </div>
      </div>
    </div>
  );  
}
