import React from 'react';

const NotFound = () => {
    const notFounfImage = 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716163200&semt=sph'
    return (
        <div>
            <div className="text-center h-[80vh] flex items-center">
                <img className='w-full max-w-[500px] mx-auto' src={notFounfImage} alt="" />
            </div>
        </div>
    );
}

export default NotFound;
