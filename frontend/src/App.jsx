import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login_user from './pages/prabath/login_user';
import Login_bank from './pages/prabath/login_bank';
import Login_admin from './pages/prabath/login_admin';
import Manupage_1 from './pages/manujaya/page_1';
import Dashboard from './pages/geesan/user_dashboard';
import Kaveeshapage_1 from './pages/kaveesha/page_1';
import Signup from './pages/prabath/signup_user';
// import UserDashboard from './pages/prabath/user_dashboard';
import logo from './assets/KPP_bbg_medium.png';

const App = () => {
  return (
    
    <div>
      <BrowserRouter>
      <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/aboutus'>About us</Link>
          <Link to='/contactus'>Contact us</Link>
        </nav>
        <img src={logo} className='mainLogo'></img>
      </header>
      
        <Routes>
          <Route path="/" element={<Kaveeshapage_1 />} />
          <Route path="/contactus" element={<Kaveeshapage_1 />} />
          <Route path="/aboutus" element={<Kaveeshapage_1 />} />

          <Route path="/prabath/login_user" element={<Login_user />} />
          <Route path="/prabath/login_bank" element={<Login_bank />} />
          <Route path="/prabath/login_admin" element={<Login_admin />} />
          <Route path='/prabath/signup_user' element={<Signup />} />
          {/* <Route path='/prabath/user_dashboard' element={<UserDashboard />} /> */}
          <Route path='/geesan/user_dashboard' element={<Dashboard />} />
          
          <Route path="/manujaya/page_1" element={<Manupage_1 />} />

          <Route path='/kaveesha/page_1' element = {<Kaveeshapage_1 />} />

        </Routes>
      </BrowserRouter>

      <footer className="footer">
      <p>&copy; 2024 KPP. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
