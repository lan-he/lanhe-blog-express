const UserModel = require('../model/user-model')

const userService = {
    queryUser: (username) => {
        return UserModel.findOne({ username })
    },
    addUser: (username, password, age) => {
        return UserModel.create({ username, password, age })
    },
    deleteUser: (_id) => {
        return UserModel.deleteOne({ _id })
    },
    updataUser: (_id, username, password, age) => {
        return UserModel.updateOne({ _id }, { username, password, age })
    },
    checkUser: (page = 1, limit = 5) => {
        return UserModel.find({}, ['username', 'age'])
            .sort({ age: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
    },
    userLogin: (username, password) => {
        return UserModel.findOne({ username, password })
    },
}
module.exports = userService
