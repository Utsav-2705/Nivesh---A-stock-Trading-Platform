import React from 'react';

function Stats() {
    return (
        <div className='container'>
            <div className='row p-3'>
                <div className='col-6 p-5'>
                    <h1 className='fs-2 mb-5'>ALGO Trading</h1>
                    <h2 className='fs-4'>Smart strategies, simplified</h2>
                    <p style={{color: "#94a3b8"}}> Build, test, and deploy algorithmic trading strategies without complexity. Whether you're a beginner or an experienced trader, automate your ideas with ease.</p>
                    <h2 className='fs-4'>Backtest before you invest</h2>
                    <p style={{color: "#94a3b8"}}>Analyze historical market data and see how your strategy would have performed before risking real capital. Trade with confidence, not assumptions.</p>

                    <h2 className='fs-4'>Automation that never sleeps</h2>
                    <p  style={{color: "#94a3b8"}}>Markets move fast. Our algorithms monitor opportunities 24/7 and execute trades instantly based on your predefined rules and conditions.</p>

                    <h2 className='fs-4'>Risk management built-in</h2>
                    <p  style={{color: "#94a3b8"}}>Protect your capital with automated stop-losses, position sizing, drawdown controls, and customizable risk parameters. </p>


                </div>
                <div className='col-6 p-5'> <img src='media/AlgoTrading.png' style={{ width: "125%" }} />


                {/*<div className='text-center'>
                <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our products <i className="fa-solid fa-arrow-right-long"  ></i></a>
                <a href=''style={{textDecoration:"none"}}>Try Kite demo <i className="fa-solid fa-arrow-right-long"  ></i></a>
                
                </div>*/}
                </div>
                 
            </div>
        </div>
    );
}

export default Stats;