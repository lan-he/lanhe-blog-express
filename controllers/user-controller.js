const userService = require('../services/user-service')
const JWT = require('../util/jwt')

const userController = {
    addUser: async (req, res) => {
        const { username, password, age } = req.body
        // 查询当前用户名是否存在
        const userData = await userService.queryUser(username)
        if (userData) {
            res.send({
                code: 0,
                message: '用户已存在',
            })
        } else {
            // 不存在创建并返回
            const successData = await userService.addUser(username, password, age)
            res.send({
                code: 1,
                data: successData,
                message: '创建成功',
            })
        }
    },
    deleteUser: async (req, res) => {
        // 删除用户
        await userService.deleteUser(req.params.id)
        res.send({
            code: 1,
        })
    },
    updataUser: async (req, res) => {
        // 更新用户
        const { id, username, password, age } = req.body
        await userService.updataUser(id, username, password, age)
        res.send({
            code: 1,
        })
    },
    checkUser: async (req, res) => {
        const { page, limit } = req.query
        const data = await userService.checkUser(page, limit)
        res.send({
            code: 1,
            data,
        })
    },
    userLogin: async (req, res) => {
        const { username, password } = req.body
        const data = await userService.userLogin(username, password)
        if (data) {
            const token = JWT.generate(
                {
                    id: data._id.toString(),
                },
                '12h'
            )
            res.header('authorization', token)
            res.send({
                code: token,
            })
        } else {
            res.send({
                code: 0,
            })
        }
    },
}
module.exports = userController
