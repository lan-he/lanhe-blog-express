const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// require('dotenv').config()
const articlesRoutes = require('./routes/articles')
const commentsRoutes = require('./routes/comments')

const app = express()
// 启用 CORS
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.send(`
        <div
            style="
                width: 100vw;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            "
        >
            <h1 style="text-align: center">Lanhe Blog Express</h1>
            <p style="text-align: center; color: gray">
                Please visit the blog at: https://123
            </p>
        </div>
    `)
})
// 路由
app.use('/api/articles', articlesRoutes)
app.use('/api/comments', commentsRoutes)
const uri =
    'mongodb+srv://15669147150g:89ta6e3b6ojHL02D@cluster0.2irj1.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err))
module.exports = app
