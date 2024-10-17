import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login_user from './pages/prabath/login/login_user';
import Login_bank from './pages/prabath/login/login_bank';
import Login_admin from './pages/prabath/login/login_admin';
import Manupage_1 from './pages/manujaya/bank_admin';
import Manupage_2 from './pages/manujaya/bank_admin_login';
import Manupage_3 from './pages/manujaya/bank_admin_signup';
import Manupage_4 from './pages/manujaya/user_info';
import Dashboard from './pages/geesan/user_dashboard';
import Kaveeshapage_1 from './pages/kaveesha/page_1';
import InvesmentHome from './pages/kaveesha/Pages/InvestmentHome';
import Help from './pages/kaveesha/Pages/Help';
import Navbar from './pages/kaveesha/Components/Navbar';
import Signup from './pages/prabath/signup/signup_user';
import SignupBank from './pages/prabath/signup/signup_bank';
import Login_sys_admin from './pages/geesan/login_sysAd';
import SysAd_dashboard from './pages/geesan/sysAd_dashboard';
// import UserDashboard from './pages/prabath/user_dashboard';
import AdminDash from './pages/prabath/dashboard/admin_dash';


import AboutUs from './pages/kaveesha/Pages/AboutUs';


const App = () => {
  return (
    
    <div>
      <BrowserRouter>
      {/*<header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/aboutus'>About us</Link>
          <Link to='/contactus'>Contact us</Link>
        </nav>
        <img src={logo} className='mainLogo'></img>
  </header>*/}
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
          
          <Route path="/manujaya/bank_admin" element={<Manupage_1 />} />

          <Route path="/manujaya/user_info" element={<Manupage_4 />} />
          <Route path='/Help' element = {<Help />} />

          


        </Routes>
      </BrowserRouter>

      <footer className="footer">
      <p>&copy; 2024 KPP. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
