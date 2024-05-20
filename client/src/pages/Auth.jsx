import React, { useState, useContext } from 'react';
import App, { Authcontext } from '../App';
import { useNavigate } from 'react-router';

export default function Auth() {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState();

    const authdata = useContext(Authcontext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can perform any action with the email and password values
        console.log("username:", username);
        console.log("Password:", password);

        const response = await fetch(authdata.serverurl + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        const data = await response.json();
        const valid = data.validuser;
        if (valid) {
            setusername('');
            setPassword('');
            await authdata.setauthdata(data)
            console.log(data);
            navigate('/space/' + data.userId)
        } else {
            seterror('Invalid credentials');
            console.log(data);
        }

    };

    return (
        <div className='h-[90vh] sm:h-[80vh] flex justify-center items-center px-5 sm:px-0'>
            <div className='max-w-4xl mx-auto sm:max-h-[500px] sm:flex rounded-lg overflow-hidden'>
                <div className="img sm:w-[50%] max-h-40 sm:max-h-full overflow-hidden">
                    <img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1715550722304-b6ee97071817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <form onSubmit={handleSubmit} className="sm:w-[50%] flex flex-col bg-gray-100 py-8 sm:py-0 px-6 justify-center leading-10">
                    <h2 className='text-3xl font-bold mb-2'>Sign in to your account</h2>
                    <p className='text-sm mt-3 text-gray-500'>
                        Be Part of Our Exclusive Community! * Please Note: We're currently not accepting new members.
                    </p>
                    <p className='mb-5 text-gray-500'><small>Check back later for updates!</small></p>

                    <input className='mb-3 px-2 rounded-md outline-none' type="text" placeholder='Username' value={username} onChange={(e) => setusername(e.target.value)} />
                    <input className='mb-3 px-2 rounded-md outline-none' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-center"><small>{error}</small></p>
                    <button className='bg-blue-500 mt-4 rounded-md py-1' type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}
