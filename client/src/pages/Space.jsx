import React, { useState, useEffect, useContext } from 'react';
import LoadingAndError from '../component/LoadingAndError';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Authcontext } from '../App';

const Space = () => {
    const value = localStorage.getItem('space-toggle') || true
    const [toggle, settoggle] = useState(value);
    const [blogs, setblogs] = useState([])
    const [error, seterror] = useState(false)

    const authdata = useContext(Authcontext)

    const { userid } = useParams()

    const cleantext = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        return div.textContent
    }

    useEffect(() => {
        const value = localStorage.getItem('space-toggle');
        if (value !== null) {
            const toggleValue = value === 'true';
            settoggle(toggleValue);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('space-toggle', toggle.toString());
    }, [toggle]);


    useEffect(() => {
        try {
            fetch(authdata.serverurl + '/blog/user/' + userid)
                .then(res =>
                    res.json()
                ).then(res => {
                    setblogs(res.reverse())
                    seterror(false)

                })
        } catch (error) {
            console.error('Error fetching blog data:', error);
            seterror(true)
        }
    }, []);

    return (
        <div>
            <div className="toggle-box flex mt-5">
                <div className="toggle-btn relative inline-flex bg-gray-200 w-auto mx-auto rounded-xl overflow-hidden">
                    <div className={"mover absolute w-36 z-0 bg-blue-400 shadow-md opacity-1 h-full rounded-xl transition-all " + (toggle ? 'left-0' : 'right-0')}></div>

                    <div onClick={() => { settoggle(true) }} className={'w-36 p-2 text-center relative cursor-pointer'}>Publlished</div>
                    <div onClick={() => { settoggle(false) }} className={'w-36 p-2 text-center relative cursor-pointer'}>Draft</div>
                </div>
            </div>

            <div className="container max-w-7xl mx-auto mt-4">
                <p className='max-w-6xl mx-auto px-3 sm:px-0'>{toggle ? 'Published Blog : ' + blogs.filter(e => e.draft === toggle).length : 'Drafted : ' + blogs.filter(e => e.draft === toggle).length}</p>

                <div className='flex flex-wrap container max-w-7xl mx-auto gap-5 mt-5 justify-center mb-5'>
                    {blogs.length === 0 ? <LoadingAndError error={error} /> :
                        blogs.filter(e => e.draft === toggle).length === 0 ?
                            <p className='h-52 flex items-center'>No {toggle ? 'published' : 'drafted'} blogs found.</p> :
                            blogs.filter(e => e.draft === toggle).map(e =>
                                <article className='w-[45%] md:max-w-[30%]' key={e?._id}>
                                    <Link to={`/editor/${e._id}`} >
                                        <div className="flex flex-col bg-white border shadow-sm rounded-xl" >
                                            <img className="w-full object-cover rounded-t-xl aspect-video" src={e?.imageUrl || 'https://images.unsplash.com/photo-1714329159908-b35833f7a6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'} alt="Image Description" />
                                            <div className="p-4 md:p-5">
                                                <h3 className="text-lg font-bold text-gray-800 clamped-paragraph-two">
                                                    {cleantext(e.title)}
                                                </h3>
                                                <p className="mt-1 text-gray-500 clamped-paragraph">
                                                    {cleantext(e.body)}
                                                </p>
                                                <p className="mt-5 text-xs text-gray-500">
                                                    {moment(e.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            )
                    }
                </div>
            </div>
        </div>
    );

}

export default Space;
