import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "../assets/css/Editor.css";

const Editor = () => {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [banner, setBanner] = useState("https://images.unsplash.com/photo-1715292779491-a32d1f086f5a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    const quill = useRef();
    const [saved, setsaved] = useState(true);

    useEffect(() => {
        if (id) {
            fetchBlogData(id);
        }
    }, [id]);

    useEffect(() => {
        if (title != '' && content != '' && banner != '') return
        const interval = setInterval(submitData, 5000);
        return () => clearInterval(interval);
    }, [content, title, banner]);

    const fetchBlogData = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/blog/${id}`);
            if (response.ok) {
                const data = await response.json();
                setTitle(data.title);
                setContent(data.body);
                setBanner(data.imageUrl);
            } else {
                console.error("Failed to fetch blog data");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    };

    const submitData = async () => {
        setsaved(false)
        const method = id ? "PUT" : "POST";
        const url = id ? `http://localhost:3000/blog/${id}` : "http://localhost:3000/blog/";

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userId": "user123",
            "title": title,
            "body": content,
            "imageUrl": banner || "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbGFuY2VkJTIwZGlldHxlbnwwfHwwfHx8MA%3D%3D"
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
                setsaved(true)
                if (method == "POST") {
                    window.location.href = `./${responseData.data._id}`;
                }
            } else {
                console.error("Failed to save data");
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

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

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, false] }],
                    ["bold", "italic", "underline", "blockquote"],
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
        }),
        [imageHandler]
    );

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

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-center items-start gap-5 sm:p-3">
            <div className="w-full p-2 sm:max-w-[200px] mr-10">
                <button className="w-full sm:w-[100px] p-2 mt-5 sm:mt-0 border-t-2 rounded">{saved ? 'saved' : 'saving...'}</button>
            </div>
            <div className="w-[100vw]  sm:min-w-[700px]">
                <QuillEditor modules={{
                    clipboard: { matchVisual: false } // Configure clipboard without toolbar
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
            <div className="bg-gray-100 w-[100%] sm:max-w-[300px] sm:-w-[300px] text-center p-2">
                <img src={banner} alt="" className="w-full sm:w-[300px]" />
                <input onKeyUp={(e) => { setBanner(e.target.value) }} type="text" className="outline-0  border-2 p-2 w-full mt-3" placeholder="Enter Banner url" />
            </div>
        </div>
    );
};

export default Editor;
