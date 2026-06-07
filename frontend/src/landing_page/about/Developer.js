import React from 'react';

function Developer() {
    return (
        <div className='container'>
            <div className='row p-5 mt-5  border-top'>
                <h1 className="text-center">Behind the Code</h1>
            </div>
            <div className='row p-5   text-muted ' style={{ lineHeight: "1.8", fontSize: "1.2em" }}>
                <div className='col-6 p-5 text-center '>
                     <img src='media/utsav.jpeg'alt="" style={{borderRadius:"100%", width:"50%"}}></img>
                     <h4 className='mt-5'>Utsav Srivastava</h4>
                     <h6>Developer</h6>
                </div>
                <div className='col-6 p-5'>
                     <p> Enthusiastic about technology, stock market platforms,
    and building modern web applications that combine
    functionality with clean user experiences.</p>
<p>Focused on transforming ideas into impactful digital
    products while continuously learning and improving
    technical expertise through hands-on projects.</p>
 
                </div>
            </div>


        </div>
    );
}

export default Developer;