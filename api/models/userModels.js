// /models/User.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    githubId: { type: String, unique: true },
    username: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String },
    avatar: { type: String }, // GitHub 头像
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)
