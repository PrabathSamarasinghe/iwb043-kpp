import React from "react";
import './Navbar.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import logo from "./logo.png";
import axios from "axios";
 
export default function Navbar() {
    const url = 'http://localhost:9090/CheckLogged';
    const checkLog =  async ()=>{
        const res = await axios.get(url,{withCredentials:true});
        console.log(res.data);
    }
    checkLog();
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} className="logo_img"></img>
            </div>
            <ul className="nav_links">
                <li><Link to = "/"> Home </Link></li>
                <li><Link to = "AboutUs">About Us</Link></li>
                <li><Link to = "Help">Help</Link></li>
        
            </ul>
            <div className="userLogin">
                <ul className="login_links">
                    <li><a className='signup' id="signupBut" href="#">Sign Up</a></li>
                    <li><a className='register' id="loginBut" href="#">Register</a></li>
                </ul>
            </div>
        </nav>
    );
}
