import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Authcontext } from "../App";
import LoadingAndError from '../component/LoadingAndError'
import { Helmet } from 'react-helmet-async';
import '../assets/css/page.css'

import '../assets/css/typo.css'

const Blog = () => {
    const { title } = useParams()
    const [blog, setBlog] = useState({})
    const [error, setError] = useState(false)

    const defaultimage = 'https://images.unsplash.com/photo-1714329159908-b35833f7a6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'

    const authdata = useContext(Authcontext)

    const cleanText = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        return div.textContent;
    }

    const inHtmlText = (data, id) => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = data;
        }
    }

    const getusernamebyid = (id) => {
        return 'zestlark'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(authdata.serverurl + `/blog/${title}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlog(data);
                setError(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError(true);
            }
        };

        fetchData();
    }, [title]);

    useEffect(() => {
        inHtmlText(blog.body, "blogbody");
    }, [blog]);

    return (
        <>
            {!blog || !blog._id ? <LoadingAndError error={error} /> :
                <div>
                    <img className="max-w-4xl mx-auto w-full aspect-auto object-cover" src={blog.imageUrl || defaultimage} alt="Image Description" />

                    <div className="max-w-4xl mx-auto p-5">
                        <h1 className="font-black text-4xl p-1 pl-0 mt-5">{cleanText(blog.title)}</h1>
                        <li className="p-1 my-5 text-sm text-gray-500">by {getusernamebyid(blog.userId)}</li>
                        <div className="mt-5" id="blogbody"></div>
                    </div>

                    <Helmet>
                        <title>{cleanText(blog.title)}</title>
                        <meta name='description' content={cleanText(blog.body.slice(0, 100))} />

                        <meta property="og:title" content={cleanText(blog.title)} />
                        <meta property="og:description" content={cleanText(blog.body.slice(0, 100))} />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content={window.location.href} />
                        <meta property="og:image" content={blog.imageUrl || defaultimage} />

                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content={cleanText(blog.title)} />
                        <meta name="twitter:description" content={cleanText(blog.body.slice(0, 100))} />
                        <meta name="twitter:image" content={blog.imageUrl || defaultimage} />
                    </Helmet>
                </div>
            }
        </>
    );
};

export default Blog;
