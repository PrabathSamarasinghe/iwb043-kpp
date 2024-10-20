import React from 'react';
import '../Styles/aboutus.css';

export default function Aboutus() {
  return (
    <div className='aboutus'>
      <section className="about">
        <h1>About Us</h1>
        <p style={{ fontWeight: 'bold' }}>
          The Best Platform to Plan Your Money....
        </p>
        <div className="about-info">
          <div className="about-img">
          <img src="/src/assets/KPP_wbg_large.png" alt="Logo" />
          </div>
          <div>
            <p>
              Welcome to investment planner!, where we empower you to take charge
              of your financial future. Our mission is to provide personalized
              investment planning solutions tailored to your unique goals and aspirations.
              Whether you're a seasoned investor or just starting out, we’re here to
              guide you every step of the way. Join us on the journey to financial success!
            </p>
            <button className='button'>Read More...</button>
          </div>
        </div>
      </section>

      <section className="team">
        <h1>Meet Our Team</h1>
        <div className="team-cards">
          <div className="card">
            <div className="card-img">
              <img src="pasidu-4.png" alt="User 1" />
            </div>
            <div className="card-info">
              <h2 className="card-name">Pasindu</h2>
              <p className="card-role">CEO and Founder</p>
              <p className="card-email">pasindumanujaya@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="kaveesha-3.png" alt="User 2" />
            </div>
            <div className="card-info">
              <h2 className="card-name">Kaveesha</h2>
              <p className="card-role">Co-Founder</p>
              <p className="card-email">priyanjithranathunga@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="geesan-4.png" alt="User 3" />
            </div>
            <div className="card-info">
              <h2 className="card-name">Geeshan</h2>
              <p className="card-role">Co-Founder</p>
              <p className="card-email">geeshan@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src="prabath-3.png" alt="User 4" />
            </div>
            <div className="card-info">
              <h2 className="card-name">Prabath</h2>
              <p className="card-role">Co-Founder</p>
              <p className="card-email">prabath@gmail.com</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
