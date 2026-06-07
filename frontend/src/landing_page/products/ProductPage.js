import React from 'react';
//import Navbar from '../Navbar';
import Hero from './Hero';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
/*import Universe from './Universe';*/
//import Footer from '../Footer';

function ProductPage() {
    return (
        <>

            <Hero />
            <LeftComponent imageURL="media/Algoo.png"
                productName="ALGO Trading"
                productDescription="Execute trades automatically based on predefined strategies and market conditions.
                Place orders within milliseconds to capture market opportunities faster than manual trading."
               /* tryDemo=""
                learnMore=""
                googlePlay=""
                appStore="" *//>

                 <RightComponent
                 imageURL=" media/Paper.png"
                productName="Paper Trade"
                productDescription=" Practice stock trading with virtual money and gain real market experience without risking your capital.
                Experience live market conditions and execute trades based on actual stock price movements."
                 
               /* learnMore=""*/ />
                  <LeftComponent imageURL=" media/Voice.png"
                productName="Voice Assistant"
                productDescription="Execute trading actions and access market information using simple voice commands.
                Get real-time stock prices, portfolio updates, and market trends through voice interaction."
                /*tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""*/ />

                <RightComponent imageURL=" media/Edu.png"
                productName="Financial Learning Center"
                productDescription="Learn the fundamentals of investing, trading, and personal finance through easy-to-understand resources.
From beginner concepts to advanced market strategies, gain the knowledge needed to invest with confidence."
                 
                learnMore="" />

                 <LeftComponent imageURL="media/dashboard.png"
                productName="DashBoard"
                productDescription="Get real-time insights into your holdings, orders, positions, and available funds.
                Stay updated with market movements, portfolio growth, and trading activity."
                /*tryDemo=""
                learnMore=""
                googlePlay=""
                appStore=""*/ />

             

                 {/*<p className='text-center mt-5 mb-5'>Want to know more about our technology stack? Check out the Zerodha.tech blog.</p>*/}
            
            {/*<Universe />*/}


        </>
    );
}

export default ProductPage;