import React from 'react';

const LoadingAndError = ({ error }) => {
    return (
        <div>
            {error ? 'Error loading data' :
                <div className='fixed top-0 left-0 w-screen h-screen bg-white flex justify-center items-center'>
                    <img className='w-[350px]' src="https://i.pinimg.com/originals/8d/89/ca/8d89ca607c0ff0f87bd5ed16a6f82ff5.gif" alt="" />
                </div>
            }
        </div>
    );
}

export default LoadingAndError;
