const express = require('express')
const router = express.Router()
const {
    getArticles,
    createArticle,
    likeArticle,
} = require('../controllers/articleController')

// 获取所有文章
router.get('/', getArticles)

// 创建新文章
router.post('/', createArticle)

// 点赞文章
router.post('/:id/like', likeArticle)

module.exports = router
