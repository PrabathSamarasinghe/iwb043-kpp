import React from 'react'

import '../Styles/help.css';

export default function help() {
  return (
    // codes
    <div className='help'>
    <div class = "container">
        <h1>FAQs</h1>

        <div class = "tab">
            <input type = "radio" name = "acc" id = "acc1"/>
            <label for = "acc1">

                <h2>01</h2>
                <h3>How do I register?</h3>

        </label>
        <div class = "content">
            <p> You can register by paying our enrollment payment.</p></div>
        </div>


    <div class = "tab">
        <input type = "radio" name = "acc" id = "acc2"/>
        <label for = "acc2">

            <h2>02</h2>
            <h3>How to Invest?</h3>

        </label>
        <div class = "content"><p>You can invest any sector you want.</p></div>
    </div>


    <div class = "tab">
        <input type = "radio" name = "acc" id = "acc3"/>
        <label for = "acc3">

            <h2>03</h2>
            <h3>How to pay?</h3>

        </label>
        <div class = "content">
            <p>1. Visa.</p>
            <p>2. Using Card.</p>
            </div>
        </div>

        <div class = "tab">
            <input type = "radio" name = "acc" id = "acc4"/>
            <label for = "acc4">

                <h2>04</h2>
                <h3>What is the minimum maturity value for LKR Investment<br/> Planners?</h3>

        </label>
        <div class = "content">
            <p> Rs. 1000/-.</p></div>
        </div>

    </div>
    </div>
    
  )
}


