const BlogModel = require('../model/blog.model.js');

const addBlog = async (req, res) => {
    try {
        const blog = await BlogModel.create(req.body);
        res.status(201).json({ message: "Blog created successfully", data: blog });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: "Failed to create blog", error: error.message });
    }
};

const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({ draft: true });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
};

const getAllBlogsOfUser = async (req, res) => {
    try {
        const blogs = await BlogModel.find({ userId: req.params.userid });
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
};

const getBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: "Failed to fetch blog", error: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully", data: blog });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: "Failed to update blog", error: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully", data: blog });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: "Failed to delete blog", error: error.message });
    }
};

module.exports = {
    addBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    getAllBlogsOfUser,
};
