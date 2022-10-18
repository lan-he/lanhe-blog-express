var express = require('express')
const userController = require('../controllers/user-controller')
var router = express.Router()
// 增
router.post('/logon', userController.addUser)
// 删
router.delete('/:id', userController.deleteUser)
// 改
router.put('/', userController.updataUser)
// 查
router.get('/', userController.checkUser)
// 登陆
router.post('/login', userController.userLogin)
module.exports = router
