import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import LoadingAndError from '../component/LoadingAndError'
import '../assets/css/page.css'

import '../assets/css/typo.css'

const Blog = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [error, setError] = useState(false)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/blog/${id}`);
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
    }, [id]);

    useEffect(() => {
        inHtmlText(blog.body, "blogbody");
    }, [blog]);

    return (
        <>
            {!blog || !blog._id ? <LoadingAndError error={error} /> :
                <div>
                    <img className="max-w-4xl mx-auto w-full aspect-auto object-cover" src={blog.imageUrl || 'https://images.unsplash.com/photo-1714329159908-b35833f7a6a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'} alt="Image Description" />

                    <div className="max-w-4xl mx-auto p-5">
                        <h1 className="font-black text-5xl p-1 pl-0 mt-5">{cleanText(blog.title)}</h1>
                        <li className="p-1 my-5 text-sm text-gray-500">by {blog.userId}</li>
                        <div className="mt-5" id="blogbody"></div>
                    </div>
                </div>
            }
        </>
    );
};

export default Blog;
