const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addBlog, getBlog, getBlogs, updateBlog, deleteBlog, getAllBlogsOfUser } = require('../controller/blog.controller.js')

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.get('/user/:userid', getAllBlogsOfUser)

router.post('/', addBlog)

router.put('/:id', updateBlog)

router.delete('/:id', deleteBlog)


module.exports = router;