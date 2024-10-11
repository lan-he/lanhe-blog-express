const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const responseMiddleware = require('./middleware.js')
// require('dotenv').config()
const articlesRoutes = require('./routes/articles')
const commentsRoutes = require('./routes/comments')
const oauthRoutes = require('./routes/oauth')

const app = express()
// 启用 CORS
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(responseMiddleware)
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
app.use('/api/oauth', oauthRoutes)
const uri = process.env.MONGODB_URI
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err))
module.exports = app
