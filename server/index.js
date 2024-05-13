const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import router
const blogRouter = require('./router/blogs.router.js');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use('/blog', blogRouter);

mongoose.connect('mongodb+srv://kanojiyadeepak747:mDiJmKJ4PEahNY9t@cluster0.jbrm0wt.mongodb.net/App?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        })
    })
    .catch(err => {
        console.log(err);
    })

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});