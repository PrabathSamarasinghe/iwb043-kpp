import React from 'react';
import {Link} from 'react-router-dom';
import '../Styles/home.css';




export default function InvesmentHome() {
  return (
    <div className='home'>
        <div class="home_text">
            <h1>Welcome!<br/>This is Your Invesment Planner</h1>
        </div>
        <div className='button_container'>
          <Link to = "/user_dashboard">
            <button><span></span>Your Invesments</button>
            </Link>
        </div>
    </div>
  )
}
