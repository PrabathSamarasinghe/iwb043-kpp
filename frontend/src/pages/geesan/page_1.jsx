import React from 'react'
import ITile from './components/investmentTile.jsx'
import TSwitch from './components/themeSwitch.jsx'
import DropPic from './components/dropdown.jsx'
import NTile from './components/newTile.jsx'

const page_1 = () => {
  const investments = [
    {InvestID:1001 ,BankName:"BOC", Amount:"3000$" ,InvestedDate:"2024/03/02"},
    {InvestID:2132 ,BankName:"Peoples Bank", Amount:"5000$" ,InvestedDate:"2021/03/02"},
    {InvestID:3231 ,BankName:"Commertial Bank", Amount:"4000$" ,InvestedDate:"2025/03/02"}
  ];

  return (
    <>
    <div className ="navbar bg-base-300">
    <TSwitch />
    <DropPic />
    </div>
    <div className='bg-base-300 min-h-96 m-12'>
      <h1 className='text-4xl p-6 text-center'>
        Your Investments
      </h1>
      <div className="flex flex-wrap gap-4" id='InvestmentBoard'>
        {investments.map((inv, index) => (
          <ITile key={index} InvestID={inv.InvestID} BankName={inv.BankName} InvestedDate={inv.InvestedDate}
          Amount={inv.Amount}/>
        ))}
        <NTile />
      </div>
    </div>
    </>
  )
}

export default page_1
