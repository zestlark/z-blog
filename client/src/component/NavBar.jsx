import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Authcontext } from '../App';

const NavBar = () => {
    const authdata = useContext(Authcontext);
    const [menu, setmenu] = useState(true)

    const logout = () => {
        authdata.setauthdata({ validuser: false });
        localStorage.clear('authdata')
    }

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap  basis-full items-center justify-between" aria-label="Global">
                <Link to={'/'}>
                    <span className="sm:order-1 flex-none text-base font-medium uppercase text-black flex items-center justify-start gap-2" href="#"><img className='w-6' src="/logo.png" alt="" />blogs</span>
                </Link>
                <div className="sm:order-3 flex items-center gap-x-2">

                    <button className='block sm:hidden' onClick={() => { setmenu(!menu) }}>
                        <i className="ri-menu-4-line text-xl mr-2"></i>
                    </button>

                    <i className="ri-search-line text-xl"></i>
                    {authdata.authdata.validuser ? <button onClick={logout} className='text-xl ml-2 text-red-500 bg-red-100 w-10 h-10 flex justify-center items-center rounded-md'><i className="ri-logout-circle-line p-0"></i></button> : ''}

                    <Link to={authdata.authdata.validuser ? 'editor' : 'auth'}>
                        <button type="button" className="py-3 px-6 ml-2 inline-flex items-center gap-x-2 text-sm font-normal rounded-full border border-gray-900 bg-black text-white shadow-sm hover:bg-transparent hover:text-black disabled:opacity-50 disabled:pointer-events-none">
                            {authdata.authdata.validuser ? <span><i className="ri-pencil-line"></i> Write</span> : 'Get Started  '}
                        </button>
                    </Link>
                </div>
                <div id="navbar-alignment" className={menu ? 'hidden sm:block ' : ' sm:block ' + "  overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto  sm:order-2"}>
                    < div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                        <Link to={'/'}>
                            <span className="font-normal text-blue-500" href="#" aria-current="page">Home</span>
                        </Link>
                        <Link to={'/space'}>
                            <span className="font-normal text-gray-400" href="#" aria-current="page">Spaces</span>
                        </Link>
                        <Link to={'https://zestlark-0.web.app'}>
                            <span className="font-normal text-gray-400" href="#" aria-current="page">Portfolio</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header >
    );
}

export default NavBar;
