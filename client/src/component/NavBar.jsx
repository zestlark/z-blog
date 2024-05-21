import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Authcontext } from '../App';
import '../style.css'

const NavBar = () => {
    const authdata = useContext(Authcontext);
    const [menu, setmenu] = useState(true)
    const [blogs, setblogs] = useState([])
    const [searchtext, setsearchtext] = useState('');
    const [searchblog, setsearchblog] = useState([]);
    const [showSearch, setshowSearch] = useState(false);

    const search = () => {
        const blog = [...blogs]
        if (searchtext.length != 0) {
            const result = blog.filter(e => {
                return e.title.toLowerCase().includes(searchtext.toLowerCase())
            })
            setsearchblog(result)
            return
        }
        setsearchblog(blog)

    }

    useEffect(() => {
        search()
    }, [searchtext]);

    const logout = () => {
        authdata.setauthdata({ validuser: false });
        localStorage.clear('authdata')
    }

    const cleanText = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        return div.textContent;
    }

    useEffect(() => {
        try {
            fetch(authdata.serverurl + '/blog')
                .then(res =>
                    res.json()
                ).then(res => {
                    setblogs(res.reverse())
                    setsearchblog(res)
                })
        } catch (error) {
            console.error('Error fetching blog data:', error);
            seterror(true)
        }
    }, []);

    return (
        <>
            {showSearch ?
                <div onClick={() => { setshowSearch(false) }} className="fixed w-svw h-svh t-0 l-0 z-10 px-3" style={{ 'background': '#fff', 'backdropFilter': 'blur(10px)' }}>
                    <div onClick={(e) => { e.stopPropagation() }} className='block w-full max-w-[600px] mx-auto'>
                        <div className='flex justify-center items-center mt-5 sm:mt-20 gap-2'>
                            <input onChange={(e) => setsearchtext(e.target.value)} autoFocus value={searchtext} type="text" className='w-full max-w-[400px] p-2 px-5 outline-none mx-auto block rounded-full border border-black' placeholder='Search' />
                            <i onClick={() => { setshowSearch(false) }} className="ri-close-circle-fill scale-110 text-2xl h-6 w-6 text-red-500 p-0 m-0 flex justify-center items-center cursor-pointer"></i>
                        </div>
                        <div className='mt-5 overflow-scroll h-[80vh]'>
                            {searchblog.map(e => {
                                return (
                                    <Link key={e._id} onClick={() => { setshowSearch(false) }} to={'/blog/' + e.title}>
                                        <div className='flex p-2 bg-[#f5f5f5] mb-2 rounded-md w-full max-w-[600px] mx-auto'>
                                            <img className='w-[100px] rounded-md aspect-video bg-white' src={e.imageUrl} alt="" />
                                            <p className=' flex flex-col justify-center items-start leading-none p-2'>
                                                <span className='clamped-paragraph-one font-bold'>{e.title}</span><br />
                                                <span className='clamped-paragraph-one'>{cleanText(e.body)}</span>
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
                : ''}


            <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
                <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap  basis-full items-center justify-between" aria-label="Global">
                    <Link to={'/'}>
                        <span className="sm:order-1 flex-none text-base font-medium uppercase text-black flex items-center justify-start gap-2" href="#"><img className='w-6' src="/logo.png" alt="" />blogs</span>
                    </Link>
                    <div className="sm:order-3 flex items-center gap-x-2">

                        <button className='block sm:hidden' onClick={() => { setmenu(!menu) }}>
                            <i className="ri-menu-4-line text-xl mr-2"></i>
                        </button>

                        <i className="ri-search-line text-xl cursor-pointer" onClick={() => { setshowSearch(true) }}></i>
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
                            <Link to={authdata.authdata.userId ? '/space/' + authdata.authdata.userId : '/auth'}>
                                <span className="font-normal text-gray-400" href="#" aria-current="page">Spaces</span>
                            </Link>
                            <Link to={'https://zestlark-0.web.app'}>
                                <span className="font-normal text-gray-400" href="#" aria-current="page">Portfolio</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
