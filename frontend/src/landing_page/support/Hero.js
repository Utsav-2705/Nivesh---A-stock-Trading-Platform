import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="support-hero">
      <div className="container">
        <div className="row align-items-center min-vh-50">
          <div className="col-lg-6">
            <h1 className="hero-title">
              How can we help you today?
            </h1>

            <p className="hero-subtitle">
              Get instant support for your account, trading,
              investments, funds, and platform-related queries.
              We're here to make your investing journey smooth and hassle-free.
            </p>

            <div className="search-box mt-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search for support topics..."
              />
            </div>

            <div className="support-links mt-4">
              <a href="/">Account Opening</a>
              <a href="/">Orders</a>
              <a href="/">Funds</a>
              <a href="/">Paper Trading</a>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="/media/support.jpg"
              alt="Support"
              className="img-fluid hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
