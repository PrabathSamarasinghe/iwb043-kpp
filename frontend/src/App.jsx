import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login_user from './pages/prabath/login/login_user';
import Login_bank from './pages/prabath/login/login_bank';
import Login_admin from './pages/prabath/login/login_admin';
import Manupage_1 from './pages/manujaya/bank_admin';
import Dashboard from './pages/geesan/user_dashboard';
import Kaveeshapage_1 from './pages/kaveesha/page_1';
import InvesmentHome from './pages/kaveesha/Pages/InvestmentHome';
import Help from './pages/kaveesha/Pages/Help';
import Navbar from './pages/kaveesha/Components/Navbar';
import Signup from './pages/prabath/signup/signup_user';
import Login_sys_admin from './pages/geesan/login_sysAd';
import SysAd_dashboard from './pages/geesan/sysAd_dashboard';
// import UserDashboard from './pages/prabath/user_dashboard';

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
          <Route path="/contactus" element={<Kaveeshapage_1 />} />
          <Route path="/aboutus" element={<Kaveeshapage_1 />} />

          <Route path="/prabath/login_user" element={<Login_user />} />
          <Route path="/prabath/login_bank" element={<Login_bank />} />
          <Route path="/prabath/login_admin" element={<Login_admin />} />
          <Route path='/prabath/signup_user' element={<Signup />} />
          {/* <Route path='/prabath/user_dashboard' element={<UserDashboard />} /> */}
          <Route path='/geesan/user_dashboard' element={<Dashboard />} />
          
          <Route path='/geesan/login_sys_ad' element={<Login_sys_admin />} />
          <Route path='/geesan/sysAd_dashboard' element={<SysAd_dashboard />} />
          
          <Route path="/manujaya/page_1" element={<Manupage_1 />} />
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
