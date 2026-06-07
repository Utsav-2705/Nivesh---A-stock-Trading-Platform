import React from 'react';
import { Link } from "react-router-dom";

function OpenAccount() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>

                <h1 className='mt-5'> Open an Account</h1>
                <p>Create your profile by clicking </p>
             <Link to="/signup">   <button className='p-2 btn btn-primary fs-5 mb-5' style={{ width: "20%", margin: "0 auto" }}>Sign up Now</button></Link> 
            </div>
        </div>
    );
}

export default OpenAccount;