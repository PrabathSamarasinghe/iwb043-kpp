import Ribbon from './components/Ribbon'
import React from 'react';
import NotVerified from './components/NotVerified';
import { InvestBoard } from './components/investBoard';

const Dashboard = () => {
  return (
    <div className='Udash'>
      <Ribbon />
      {verified ? <InvestBoard /> : <NotVerified />}
    </div>
  );
};

export default Dashboard
