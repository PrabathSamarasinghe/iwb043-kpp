import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import logo from "./logo.png";
 
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} className="logo_img"></img>
            </div>
            <ul className="nav_links">
                <li><Link to = "/"> Home </Link></li>
                <li><Link to = "/AboutUs">About Us</Link></li>
                <li><Link to = "/Help">Help</Link></li>
        
            </ul>
            <div className="userLogin">
                <ul className="login_links">
                    <li><a className='signup'><Link to = "/signup_user"> Sign up </Link></a></li>
                    <li><a className='register'><Link to = "/login_user"> Log In </Link></a></li>
                </ul>
            </div>
        </nav>
    );
}
