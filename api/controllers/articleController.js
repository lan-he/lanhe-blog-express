const Article = require('../models/article')

// 获取所有文章
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}, 'title overview')
        res.json(articles)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving articles' })
    }
}

// 创建新文章
exports.createArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body)
        await newArticle.save()
        res.status(201).json(newArticle)
    } catch (error) {
        res.status(500).json({ message: 'Error creating article' })
    }
}

// 点赞文章
exports.likeArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        article.likes += 1
        await article.save()
        res.json(article)
    } catch (error) {
        res.status(500).json({ message: 'Error liking article' })
    }
}

// 获取文章详情
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        res.json(article)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving article details' })
    }
}
