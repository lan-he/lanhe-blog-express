const express = require('express')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
// require('dotenv').config()
const articlesRoutes = require('./routes/articles')
const commentsRoutes = require('./routes/comments')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 定义路由
app.get('/', (req, res) => {
    res.send('Hello World')
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
// 创建 MongoClient 实例并配置 Server API 版本
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     },
// })
// // 连接数据库的函数
// async function connectDB() {
//     try {
//         await client.connect()
//         const db = client.db('blog') // 连接到名为 "blog" 的数据库
//         return db
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error)
//     }
// }
// app.post('/articles/add', async (req, res) => {
//     console.log(req.body)

//     const { title, content, describe } = req.body

//     if (!title || !content) {
//         return res
//             .status(400)
//             .json({ message: 'Title and content are required6' })
//     }

//     try {
//         const db = await connectDB()
//         const articlesCollection = db.collection('articles')

//         const newArticle = {
//             title,
//             content,
//             describe: describe || '',
//             likes: 0,
//             views: 0,
//             createdAt: new Date(),
//             comments: [],
//         }

//         const result = await articlesCollection.insertOne(newArticle)
//         res.status(201).json({ articleId: result.insertedId })
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating article', error })
//     }
// })
module.exports = app
