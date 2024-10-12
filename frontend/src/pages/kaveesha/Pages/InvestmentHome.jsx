import React from 'react';

import '../Styles/home.css';




export default function InvesmentHome() {
  return (
    <div className='home'>
        <div class="home_text">
            <h1>Welcome!<br/>This is Your Invesment Planner</h1>
        </div>
        <div className='button_container'>
            <button><span></span>Choose An Invesment</button>
        </div>      
    </div>
  )
}
