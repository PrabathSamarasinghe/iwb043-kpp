import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login_user from './pages/prabath/login_user';
import Login_bank from './pages/prabath/login_bank';
import Login_admin from './pages/prabath/login_admin';
import Manupage_1 from './pages/manujaya/page_1';
import Geeshapage_1 from './pages/geesan/page_1';
import Kaveeshapage_1 from './pages/kaveesha/page_1';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/prabath/login_user" element={<Login_user />} />
          <Route path="/prabath/login_bank" element={<Login_bank />} />
          <Route path="/prabath/login_admin" element={<Login_admin />} />

          <Route path="/manujaya/page_1" element={<Manupage_1 />} />

          <Route path='/geesan/page_1' element = {<Geeshapage_1 />} />

          <Route path='/kaveesha/page_1' element = {<Kaveeshapage_1 />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
