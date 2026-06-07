import React from 'react';

function Education() {
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                <img src='media/education.png' alt="" style={{width:"90%"}}></img>
                </div>

                <div className='col-6'>
                    <h1 className='mb-3 fs-2' >Financial Learning Center</h1>
                    <p>Learn the fundamentals of investing, trading, and personal finance through easy-to-understand resources.
From beginner concepts to advanced market strategies, gain the knowledge needed to invest with confidence.</p>
                    {/*<a href='' style={{ textDecoration: "none" }}>Varsity <i className="fa-solid fa-arrow-right-long"  ></i></a>*/}
                    <p className='mt-5'>Build financial confidence, sharpen your skills, and make smarter investment decisions with NIVESH.</p>
                    {/*<a href='' style={{ textDecoration: "none" }}>Trading Q&A<i className="fa-solid fa-arrow-right-long"  ></i></a>*/}
                </div>
            </div>
        </div>

    );
}

export default Education;