const Article = require('../models/article')

// 获取文章的评论
exports.getComments = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId)
        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        res.json(article.comments)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments' })
    }
}

// 为文章添加评论
exports.addComment = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId)
        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }
        article.comments.push(req.body)
        await article.save()
        res.status(201).json(article.comments)
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' })
    }
}
