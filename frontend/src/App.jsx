import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login_user from './pages/prabath/login/login_user';
import Login_bank from './pages/prabath/login/login_bank';
import Login_admin from './pages/prabath/login/login_admin';
import Manupage_1 from './pages/manujaya/bank_admin';

import Manupage_2 from './pages/manujaya/bank_admin_signup';
// import Manupage_3 from './pages/manujaya/bank_admin_login';

import Manupage_4 from './pages/manujaya/user_info';
import Dashboard from './pages/geesan/user_dashboard';
import InvesmentHome from './pages/kaveesha/Pages/InvestmentHome';
import Help from './pages/kaveesha/Pages/Help';
import Navbar from './pages/kaveesha/Components/Navbar';
import Signup from './pages/prabath/signup/signup_user';

import DashboardFixed from './pages/kaveesha/Pages/dashboardFixed';
import DashboardSavings from './pages/kaveesha/Pages/dashboardSavings';


// import UserDashboard from './pages/prabath/user_dashboard';
import AdminDash from './pages/prabath/dashboard/admin_dash';


import AboutUs from './pages/kaveesha/Pages/AboutUs';


const App = () => {
  return (

    
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element = {<InvesmentHome />} />
          <Route path='/help' element = {<Help />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          


          <Route path="/prabath/login_user" element={<Login_user />} />
          <Route path="/prabath/login_bank" element={<Login_bank />} />
          <Route path="/prabath/login_admin" element={<Login_admin />} />
          <Route path='/prabath/signup_user' element={<Signup />} />
          <Route path='/prabath/signup_bank' element={<SignupBank />} />
          <Route path='/prabath/admin_dash' element={<AdminDash />} />
          {/* <Route path='/prabath/user_dashboard' element={<UserDashboard />} /> */}
          <Route path='/geesan/user_dashboard' element={<Dashboard />} />
          
          <Route path="/manujaya/bank_admin_signup" element={<Manupage_3/>} />
          <Route path="/manujaya/bank_admin" element={<Manupage_1 />} />
          <Route path="/manujaya/user_info" element={<Manupage_4 />} />
          

          



    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>KPP_BANK</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>

  )
}

export default App
