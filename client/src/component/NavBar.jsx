import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between" aria-label="Global">
                <a className="sm:order-1 flex-none text-base font-medium uppercase text-black" href="#">z blogs</a>
                <div className="sm:order-3 flex items-center gap-x-2">
                    <button type="button" className="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-alignment" aria-controls="navbar-alignment" aria-label="Toggle navigation">
                        <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <i className="ri-search-line text-xl mr-3"></i>
                    <button type="button" className="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-normal rounded-full border border-gray-900 bg-black text-white shadow-sm hover:bg-transparent hover:text-black disabled:opacity-50 disabled:pointer-events-none">
                        Get Started
                    </button>

                </div>
                <div id="navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                        <a className="font-normal text-blue-500" href="#" aria-current="page">Home</a>
                        <a className="font-normal text-gray-600 hover:text-gray-400" href="#">Portfolio</a>
                    </div>


                </div>
            </nav>
        </header>
    );
}

export default NavBar;
