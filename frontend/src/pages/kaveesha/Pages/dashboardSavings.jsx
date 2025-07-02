import React from "react";
import '../Styles/dashboardSavings.css';

export default function DashboardSavings() {
    return (
         <div className="dashboardSavings">
                <div className="invesment-container">
                    <div className="invesment-header">
                        <h1>Investment Amount</h1>
                    </div>
                    <div className="amount-options">
                        <button>Rs 12K</button>
                        <button>Rs 6,000</button>
                        <button>Rs 3,500</button>
                        <button>Rs 3,000</button>
                        <button>Rs 2,500</button>
                        <button className="active">Rs 2,000</button>
                    </div>
                    <div className="custom-amount">
                        <input type="text" placeholder="Rs.2000" /> 
                        <select>
                            <option value="LKR">LKR</option>
                            <option value="USD">Dollars</option>
                        </select>
                    </div>
                    <button className="Invest-button">INVEST</button>
                </div>
                <div className="empty-box">
                    <h2>Best Options</h2>
                </div>
            </div>
        
    );
}
