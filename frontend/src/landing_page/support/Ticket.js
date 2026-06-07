import React from 'react';

function Ticket() {
    return (
        <div className='container'>

            <div className='row p-5 mt-5'>
                <h1 className='fs-3'>
                    To create a ticket, select a relevant topic
                </h1>
            </div>

            <div className='row p-4 mb-5'>

                {/* Column 1 */}
                <div className='col-4'>
                    <h4 className='fs-5 mb-4'>◉ Account Opening</h4>

                    <p className='text-primary'>Online Account Opening</p>
                    <p className='text-primary'>Offline Account Opening</p>
                    <p className='text-primary'>Company, Partnership and HUF Account Opening</p>
                    <p className='text-primary'>NRI Account Opening</p>
                    <p className='text-primary'>Charges at Zerodha</p>
                    <p className='text-primary'>Zerodha IDFC FIRST Bank 3-in-1 Account</p>
                    <p className='text-primary'>Getting Started</p>
                </div>

                {/* Column 2 */}
                <div className='col-4'>
                    <h4 className='fs-5 mb-4'>👤 Your Zerodha Account</h4>

                    <p className='text-primary'>Login Credentials</p>
                    <p className='text-primary'>Account Modification and Segment Addition</p>
                    <p className='text-primary'>DP ID and Bank Details</p>
                    <p className='text-primary'>Your Profile</p>
                    <p className='text-primary'>Transfer and Conversion of Shares</p>
                </div>

                {/* Column 3 */}
                <div className='col-4'>
                    <h4 className='fs-5 mb-4'>📊 Your Zerodha Account</h4>

                    <p className='text-primary'>Margin/leverage, Product and Order types</p>
                    <p className='text-primary'>Kite Web and Mobile</p>
                    <p className='text-primary'>Trading FAQs</p>
                    <p className='text-primary'>Corporate Actions</p>
                    <p className='text-primary'>Sentinel</p>
                    <p className='text-primary'>Kite API</p>
                    <p className='text-primary'>Pi and other platform</p>
                    <p className='text-primary'>Stockreports+</p>
                    <p className='text-primary'>GTT</p>
                </div>

            </div>

        </div>
    );
}

export default Ticket;
