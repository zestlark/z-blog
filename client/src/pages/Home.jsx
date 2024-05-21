import React, { useState, useEffect, useContext } from 'react'
import Banner from '../component/Banner'
import readAbleTime from '../functions/time.function.js'
import LoadingAndError from '../component/LoadingAndError.jsx'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Authcontext } from '../App.jsx'

export default function Home() {
    const [blogs, setblogs] = useState([])
    const [sideblog, setsideblog] = useState([])
    const [error, seterror] = useState(false)

    const authdata = useContext(Authcontext)

    const cleantext = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        return div.textContent
    }

    useEffect(() => {
        try {
            fetch(authdata.serverurl + '/blog')
                .then(res =>
                    res.json()
                ).then(res => {
                    let refres = [...res]
                    let halfLength = Math.floor(refres.length / 1.5);
                    let x = halfLength - (halfLength % 3);
                    let y = refres.length - x;
                    setblogs(res.reverse().splice(0, x))
                    setsideblog(res.splice(0, y))
                    seterror(false)

                })
        } catch (error) {
            console.error('Error fetching blog data:', error);
            seterror(true)
        }
    }, []);

    return (
        <>
            <Banner />
            <div className='flex justify-center flex-col sm:flex-row items-start'>
                {/* main blog */}
                <div className='flex flex-wrap container max-w-7xl mx-auto gap-2 sm:gap-5 mt-5 justify-center items-start mb-5'>
                    {blogs.length === 0 ? <LoadingAndError error={error} /> : blogs.map(e => {
                        return (
                            <article className='w-[45%] md:max-w-[30%]' key={e?._id}>
                                <Link to={`/blog/${e.title}`} >
                                    <div className="flex flex-col bg-white border shadow-sm rounded-md" >
                                        <img className="w-full object-cover rounded-t-md aspect-video" src={e?.imageUrl || 'https://images.unsplash.com/photo-1714329159908-b35833f7a6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'} alt="Image Description" />
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
                    })}
                </div>

                {/* side blog */}
                <div className='p-2 w-full sm:w-[30%] mr-10 mt-1'>
                    <p className='mb-3'>Most Popular</p>
                    {sideblog.map(e => {
                        return (
                            <Link to={`/blog/${e.title}`} key={e._id}>
                                <article className="bg-white flex items-center gap-5 rounded-xl overflow-hidden border mb-3">
                                    <img className='min-w-[150px] max-w[150px] h-[100px] object-cover object-center' src={e?.imageUrl || 'https://images.unsplash.com/photo-1714329159908-b35833f7a6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'} alt="" />
                                    <div className='py-2'>
                                        <p className="mt-1 text-gray-900 font-medium clamped-paragraph">
                                            {cleantext(e.title)}
                                        </p>
                                        <p className="mt-2 text-xs text-gray-500">
                                            {moment(e.createdAt).fromNow()}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
