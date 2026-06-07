import React from 'react';

function Hero() {
    return (


<section className="container py-5">
  <div className="row align-items-center">

    <div className="col-lg-5">
      <span className="badge bg-primary mb-3">
        PAPER TRADING
      </span>

      <h1 className="display-3 fw-bold">
        Practice Trading
        <br />
        <span className="text-primary">
          Without Risk
        </span>
      </h1>

      <p className="lead mt-4">
        Learn stock market investing with virtual money,
        test your strategies, and build confidence before
        investing real capital.
      </p>

      <div className="mt-4">
        <button className="btn btn-primary btn-lg me-3">
          Start Paper Trading
        </button>

        <button className="btn btn-outline-primary btn-lg">
          View Leaderboard
        </button>
      </div>
    </div>

    <div className="col-lg-7 text-center">
      <img
        src="/media/dashboard.png"
        alt=""
        className="img-fluid"
      />
    </div>

  </div>
</section>
);
}

export default Hero;