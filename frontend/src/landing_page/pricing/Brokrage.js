import React from 'react';

function Brokrage() {
    return ( 
       <div className='container'>
        <div className='row p-5 mt-5 text-center border-top'>
           <div className='col-8 p-4'>
             <a href=''style={{textDecoration:"none"}}> 
                 <h3 className='fs-5'>Brokerage Calculator</h3> 
             </a> 

             <ul style={{textAlign:"left" ,lineHeight:"2"}} className='text-muted'>
            <li>• ₹0 brokerage on equity delivery</li>
            <li>• ₹20 flat on intraday and F&O orders</li>
            <li>• Auto includes all government taxes</li>
            <li>• Real-time profit estimation</li>
        </ul>
        
    </div>
 

             <div className='col-4 p-4'>
               <a href=''style={{textDecoration:"none"}}>  <h3 className='fs-5'>List of charges</h3> </a> 
             </div>
        </div>
       </div>
     );
}

export default Brokrage;