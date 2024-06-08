const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import router
const blogRouter = require('./router/blogs.router.js');
const authRouter = require('./router/auth.router.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/blog', blogRouter);

app.use('/auth', authRouter)

const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
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