function Awards() {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-md-6 text-center">
          <img
            src="media/paperTrading.jpg"
            alt="Trading"
            className="img-fluid"
            style={{ width: "80%" }}
          />
        </div>

        <div className="col-md-6">
          <h1>Master Trading Without Risk</h1>

          <p className="mb-5">
             Practice stock market trading with virtual money and gain real market experience without risking your capital.
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>Buy & Sell Virtual Stocks</li>
                <li>Virtual Stock Trading</li>
                <li>Risk-Free Learning</li>
              </ul>
            </div>

            <div className="col-6">
              <ul>
                <li>Stocks and IPOs</li>
                <li>Performance Tracking</li>
                <li>Test Trading Strategies</li>
              </ul>
            </div>
          </div>

         {/* <img
            src="media/pressLogos.png"
            alt="Press Logos"
            className="img-fluid mt-4"
            style={{ width: "90%" }}
          />*/}
        </div>

      </div>
    </div>
  );
}
export default Awards;