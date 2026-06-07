import React from 'react';

function Pricing() {
    return ( 
         <div className='container  '>
            <div className='row'>
                <div className='col-4'>
                    <h1 className='mb-3 fs-2'>Dashboard</h1>
                    <p>All  stocks, analytics, and market insights at your fingertips.
                        Gain valuable insights, discover opportunities, and take control of your financial journey.
                    </p>
                 {/*   <a href='' style={{textDecoration:"none"}}>See Pricing <i className="fa-solid fa-arrow-right-long"  ></i></a>*/}
                </div>
                <div className='col-2'></div>
                <div className='col-6 mb-5'>
                    <div className='row text-center '>
                        <div className='col p-3 border'>
                            <h1 className='mb-3'>₹0</h1>
                            <p>Free equity delivery and <br></br>direct mutual funds </p>
                        </div>
                         <div className='col p-3 border'>
                            <h1 className='mb-3'>₹20</h1>
                            <p> Intraday and F&O </p>
                         
                         </div>
                    </div>
                </div>
            </div>
         </div>
     );
}

export default Pricing;