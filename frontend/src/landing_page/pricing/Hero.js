import React from 'react';

function Hero() {
    return (
        <div className='container'>

            {/* Top Heading */}
            <div className='row p-5 mt-5  '>
                <h1 style={{textAlign:"center"}}>Pricing</h1>
                <h3 className='text-muted mt-3 fs-5'style={{textAlign:"center"}}>List of all charges and taxes</h3>
            </div>

            {/* Pricing Cards */}
            <div className='row p-5 mt-5 text-center'>

                <div className='col-4 p-5'>
                    <img src='media/pricingEquity.svg' alt='' />
                    <h3 className='mt-4 fs-4'>Free equity delivery</h3>
                    <p className='text-muted'>
                        All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.
                    </p>
                </div>

                <div className='col-4 p-5'>
                    <img src='media/intradayTrades.svg' alt='' />
                    <h3 className='mt-4'>Intraday and F&O trades</h3>
                    <p className='text-muted'>
                        Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades.
                    </p>
                </div>

                <div className='col-4 p-5'>
                    <img src='media/pricingMF.svg' alt='' />
                    <h3 className='mt-4'>Free direct MF</h3>
                    <p className='text-muted'>
                        All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Hero;
