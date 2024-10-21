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
          


          <Route path="/login_user" element={<Login_user />} />
          <Route path="/login_bank" element={<Login_bank />} />
          <Route path="/login_admin" element={<Login_admin />} />
          <Route path='/signup_user' element={<Signup />} />
          <Route path='/admin_dash' element={<AdminDash />} />
          {/* <Route path='/prabath/user_dashboard' element={<UserDashboard />} /> */}
          <Route path='/user_dashboard' element={<Dashboard />} />
          
          <Route path="/bank_admin" element={<Manupage_1 />} />
          <Route path="/bank_admin_signup" element={<Manupage_2 />} />
          <Route path="/user_info" element={<Manupage_4 />} />
          <Route path="/fixed_suggessions" element={< DashboardFixed />}/>
          <Route path="/savings_suggessions" element={< DashboardSavings />}/>
        </Routes>
      </BrowserRouter>

      <footer className="footer">
      <p>&copy; 2024 KPP. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
