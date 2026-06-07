import React from 'react';

function Hero() {
    return (
        <div className='container'>
            
            <div className='row p-5 mt-5 mb-5'>
                <h1 className="fs-3 text-center">
                    Smart investing powered by modern technology.
                    <br />
                    Your gateway to modern stock trading.
                </h1>
            </div>

            <div
                className='row p-5 mt-5 border-top text-muted'
                style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >

                <div className='col-6 p-5'>
                    <p>
                        A technology-driven stock trading platform focused on
                        delivering real-time insights, secure transactions,
                        and an intuitive investing experience for modern investors.
                    </p>

                    <p>
                        Designed to simplify stock market investing through
                        modern technology, smart analytics, and a seamless
                        trading experience. Built for traders and investors
                        who value speed, security, and simplicity.
                    </p>
                </div>

                <div className='col-6 p-5'>
                    <p>
                        A clean interface, fast performance, and secure
    transactions create a seamless and modern trading
    experience for every user.
                    </p>

                    <p>
                         Created to make stock market investing simpler,
    smarter, and more accessible for modern investors.
                    </p>

                    <p>
                        Continuous innovation and powerful technology aim to
                        deliver a better investing experience every day.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Hero;