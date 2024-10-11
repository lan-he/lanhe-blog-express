const express = require('express')
const router = express.Router()
const axios = require('axios')
const User = require('../models/userModels.js')

// 获取所有文章
router.get('/github/redirect', async (req, res) => {
    try {
        // 向 GitHub 请求令牌
        const requestToken = req.query.code
        const tokenResponse = await axios.post(
            `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
            {
                headers: {
                    accept: 'application/json',
                },
            }
        )
        const params = new URLSearchParams(tokenResponse.data)
        const accessToken = params.get('access_token')
        const result = await axios.get(`https://api.github.com/user`, {
            headers: {
                accept: 'application/json',
                Authorization: `token ${accessToken}`,
            },
        })
        // 查找现有用户
        let user = await User.findOne({ githubId: result.data.id })
        if (!user) {
            // 如果用户不存在，创建新用户
            user = new User({
                githubId: result.data.id,
                username: result.data.login,
                nickname: result.data.name,
                email: result.data.email || '',
                avatar: result.data.avatar_url,
            })
            await user.save()
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching data from external API',
            error,
        })
    }
})

module.exports = router
