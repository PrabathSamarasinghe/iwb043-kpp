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
                <li><a href="#">About Us</a></li>
                <li><Link to = "Help">Help</Link></li>
        
            </ul>
            <div className="userLogin">
                <ul className="login_links">
                    <li><a className='signup' href="#">Sign Up</a></li>
                    <li><a className='register' href="#">Register</a></li>
                </ul>
            </div>
        </nav>
    );
}
