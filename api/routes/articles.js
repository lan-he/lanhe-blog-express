const express = require('express')
const router = express.Router()
const {
    getArticles,
    createArticle,
    likeArticle,
    getArticleById,
} = require('../controllers/articleController')

// 获取所有文章
router.get('/', getArticles)

// 获取文章详情，返回完整内容
router.get('/:id', getArticleById)

// 创建新文章
router.post('/', createArticle)

// 点赞文章
router.post('/:id/like', likeArticle)

module.exports = router
