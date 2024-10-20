import React from "react";
import '../Styles/dashboardFixed.css';

export default function DashboardFixed() {
    return (
        <div className="DashboardFixed">
            <section className="dash">
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
                            <option value="Dollars">Dollars</option>
                        </select>
                    </div>
                    <div className="Duration">
                        <label htmlFor="chooseOption">Choose a period:</label>
                        <input list="options" id="chooseOption" name="chooseOption" placeholder="Duration..." />
                        <datalist id="options">
                            <option value="3 Months" />
                            <option value="6 Months" />
                            <option value="1 Year" />
                            <option value="2 Years" />
                            <option value="5 Years" />
                        </datalist>
                    </div>
                    <button className="Invest-button">INVEST</button>
                </div>
                
                <div className="empty-box">
                    <h2>BEST OPTIONS HERE</h2>
                </div>
            </section>
        </div>
    );
}
