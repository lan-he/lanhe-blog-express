const Article = require('../models/article')

// 获取所有文章
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find({}, 'title overview likes views')
        res.sendResponse(articles)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving articles' })
    }
}

// 创建新文章
exports.createArticle = async (req, res) => {
    try {
        const newArticle = new Article(req.body)
        await newArticle.save()
        // res.status(201).json(newArticle)
        res.sendResponse(newArticle)
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
        // const article = await Article.findById(req.params.id)
        // 查找文章并自增观看数
        const article = await Article.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } }, // 每次请求时增加观看数
            { new: true } // 返回更新后的文档
        )

        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        res.json(article)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving article details' })
    }
}
