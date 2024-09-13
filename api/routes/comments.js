const express = require('express')
const router = express.Router()
const { addComment, getComments } = require('../controllers/commentController')

// 获取文章的评论
router.get('/:articleId', getComments)

// 为文章添加评论
router.post('/:articleId', addComment)

module.exports = router
