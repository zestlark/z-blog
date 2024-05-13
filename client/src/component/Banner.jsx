import React from 'react';

const Banner = () => {
    return (
        <div className="bg-white border shadow-sm py-[60px] overflow-hidden" style={{ background: 'url(https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundPosition: '0 -300px' }}>
            <div className="container mx-auto">
                <div className="p-4 md:p-5 flex flex-col justify-center items-center ">
                    <h3 className="font-black text-4xl text-center mb-2">
                        Discover Inspiring Stories Here!
                    </h3>
                    <p className="font-medium text-gray-800 text-center">
                        Explore, Learn, and Inspire: Your Gateway to Infinite Knowledge.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
