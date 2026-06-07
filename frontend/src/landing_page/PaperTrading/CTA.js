import React from 'react';

function CTA() {
    return (


<section className="container py-5">

  <div
    className="p-5 rounded-4 text-white"
    style={{
      background:
        "linear-gradient(90deg,#0047ff,#005eff)"
    }}
  >

    <div className="row align-items-center">

      <div className="col-lg-6">
        <h1>
          Ready to Become a Better Trader?
        </h1>

        <p className="mt-3">
          Start practicing with virtual money today.
        </p>

        <button className="btn btn-light btn-lg">
          Start Paper Trading
        </button>
      </div>

      <div className="col-lg-6 text-center">
        <img
          src="/media/laptop.png"
          className="img-fluid"
          alt=""
        />
      </div>

    </div>

  </div>

</section>
 );
}

export default CTA;