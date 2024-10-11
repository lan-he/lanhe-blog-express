const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {
        id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        avatar: { type: String, required: true },
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const articleSchema = new Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true }, // 新增概述字段
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [commentSchema],
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Article', articleSchema)
