import { useCallback, useMemo, useRef, useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../assets/css/Editor.css";
import moment from 'moment';
import { Authcontext } from "../App";


const Editor = () => {
    const { id } = useParams();
    const defaultimage = 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbGFuY2VkJTIwZGlldHxlbnwwfHwwfHx8MA%3D%3D'
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState(defaultimage);
    const [filedraft, setfiledraft] = useState(false);
    const [saved, setsaved] = useState(true);
    const [previousdata, setpreviousdata] = useState({});

    const authdata = useContext(Authcontext)

    const navigate = useNavigate();

    const quill = useRef();


    useEffect(() => {
        if (id) {
            fetchBlogData(id);
        }
    }, [id]);


    const fetchBlogData = async (id) => {
        try {
            const response = await fetch(authdata.serverurl + `/blog/id/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setContent(data.body);
                setBanner(data.imageUrl);
                setfiledraft(typeof data.draft !== 'boolean' ? true : data.draft);
                setpreviousdata(data)
            } else {
                console.error("Failed to fetch blog data");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    const filedraftchange = () => {
        setfiledraft(!filedraft)
    }

    const deleteBlog = async () => {
        let alertuser = confirm("Are you sure you want delete this blog?");
        if (alertuser) {
            try {
                const response = await fetch(authdata.serverurl + `/blog/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Blog deleted successfully:', result);
                    navigate('/space/' + authdata.authdata.userId);
                } else {
                    console.error('Failed to delete the blog:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error deleting the blog:', error);
            }
        }
    };


    const submitData = async () => {
        setsaved(false)
        const method = id ? "PUT" : "POST";
        const url = id ? authdata.serverurl + `/blog/${id}` : authdata.serverurl + "/blog/";

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const div = document.createElement("div")
        div.innerHTML = title;
        let title2 = div.textContent;

        const raw = JSON.stringify({
            "userId": authdata.authdata.userId,
            "title": title2,
            "body": content,
            "draft": filedraft,
            "imageUrl": banner || defaultimage
        });

        try {
            const requestOptions = {
                method: method,
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const responseData = await response.json();
                console.log("Data saved" + responseData.data._id + method);
                console.log(responseData.data._id);
                setpreviousdata(responseData.data);
                setfiledraft(responseData.data.draft);
                console.log(responseData.data);
                setTimeout(() => { setsaved(true) }, 1000);
                if (method == "POST") {
                    navigate(`./${responseData.data._id}`);
                }
            } else {
                console.error("Failed to save data");
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            if (cleanText(title) === previousdata.title && content === previousdata.body && banner === previousdata.imageUrl && filedraft === previousdata.draft) return;

            if (title !== '' && content !== '') {
                await submitData();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [content, title, banner, previousdata, filedraft, submitData]);


    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const imageUrl = reader.result;
                const quillEditor = quill.current.getEditor();
                const range = quillEditor.getSelection(true);
                quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
            };

            reader.readAsDataURL(file);
        };
    }, []);

    const imageError = () => {
        setBanner(defaultimage)
    }

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, false] }],
                ["bold"], ["italic"], ["underline"], ["blockquote"],
                [{ align: [] }],
                [{ color: [] }],
                ["code"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                ],
                ["link", "image"],
                ["clean"],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        clipboard: {
            matchVisual: false,
        },
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
        "code"
    ];

    const cleanText = (data) => {
        const div = document.createElement('div');
        div.innerHTML = data;
        return div.textContent;
    }

    return (
        <div className="flex flex-col sm:flex-row justify-center items-start gap-5 sm:p-3">
            <div className="w-full px-2 sm:max-w-[300px] mr-10 sm:sticky top-5">
                <ul>
                    <ul className="bg-gray-100 py-3 mb-3">
                        <li className="mb-2 text-sm">Created at : {moment(previousdata.createdAt).fromNow()}</li>
                        <li className="mb-2 text-sm">Updated at : {moment(previousdata.updatedAt).fromNow()}</li>
                    </ul>
                </ul>

                <div className="p-2 flex gap-2 justify-between items-center bg-gray-100 mb-3">
                    Publish
                    <div onClick={filedraftchange} className={'w-12 h-7 rounded-3xl ' + (filedraft ? 'bg-blue-500' : 'bg-gray-300') + ' p-1 transition-colors duration-300'}>
                        <div className={'h-full rounded-full aspect-square bg-white ' + (filedraft ? 'float-end' : 'float-start')}></div>
                    </div>
                </div>

                <div className="p-2 flex justify-center gap-2 bg-gray-100 mb-3">{saved ? <p className="text-green-500"><i className="ri-check-double-line"></i> Saved</p> : <p className="text-yellow-400"><i className="ri-loader-4-line"></i> Saving</p>}</div>

            </div>
            <div className="w-[100vw]  sm:min-w-[700px]">
                <div className="w-full relative group">
                    <img src={banner} onError={imageError} alt="" className="w-full group-hover:opacity-50" />
                    <input
                        value={banner}
                        onChange={(e) => { setBanner(e.target.value) }}
                        type="text"
                        className="outline-0 top-[50%] translate-y-[-50%] border-2 p-2 w-full absolute hidden group-hover:block"
                        placeholder="Enter Banner url"
                    />
                </div>


                <QuillEditor modules={{
                    clipboard: { matchVisual: false }
                }} id="title" theme="bubble" placeholder="Title your masterpiece.."
                    value={title}
                    onChange={(value) => setTitle(value)}
                />
                <QuillEditor
                    ref={quill}
                    theme="snow"
                    value={content}
                    formats={formats}
                    modules={modules}
                    placeholder="Begin your story here. Let your imagination flow freely ✨"
                    onChange={(value) => setContent(value)}
                />
            </div>
            <div className=" w-[100%] sm:max-w-[300px] sm:-w-[300px] text-center p-2">
                {filedraft ?
                    <Link to={'../../blog/' + previousdata.title}>
                        <button className="bg-blue-500 w-full py-2 mb-3 text-white  border-2 rounded-lg">See Blog <i className="ri-arrow-right-up-line"></i></button>
                    </Link> : ''
                }
                <button onClick={deleteBlog} className="bg-red-100 w-full py-1 text-red-600 border-red-300 border-2 rounded-lg"><i className="ri-delete-bin-6-line"></i> Delete</button>
            </div>
        </div>
    );
};

export default Editor;
