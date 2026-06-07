import React from "react";
import {
  FaShieldAlt,
   
   
  
  FaUniversity,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

import "./Footer.css";

function Footer() {
  return (
    <footer className="nivesh-footer container my-5">

      

        
              

        

      {/* Bottom Dark Footer */}
      <div className="bottom-footer">

        <div className="row align-items-center">

          <div className="col-lg-5 mb-3 mb-lg-0">
            <div className="d-flex align-items-center gap-3">
              <div className="shield-circle">
                <FaShieldAlt />
              </div>

              <p className="mb-0">
                Nivesh is committed to creating a safe, transparent,
                and empowering trading experience.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row text-center">

              <div className="col">
                <FaUniversity className="footer-small-icon" />
                <div>Regulatory</div>
                <small>Compliant</small>
              </div>

              <div className="col">
                <FaShieldAlt className="footer-small-icon" />
                <div>Secure</div>
                <small>Platform</small>
              </div>

              <div className="col">
                <FaLock className="footer-small-icon" />
                <div>Privacy</div>
                <small>Protected</small>
              </div>

              <div className="col">
                <FaHeadset className="footer-small-icon" />
                <div>Customer</div>
                <small>Support</small>
              </div>

            </div>
          </div>

        </div>

        <hr />

        <h3 className="text-center fw-bold">
          <span className="green-text">Nivesh.</span> Trade.
          <span className="green-text"> Invest.</span>
          <span className="cyan-text"> Grow.</span>
        </h3>

      </div>
    </footer>
  );
}

export default Footer;