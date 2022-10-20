const JWT = require('../util/jwt')
function start(httpServer) {
    const io = require('socket.io')(httpServer, { cors: true })
    io.on('connection', (socket) => {
        const payload = JWT.verify(socket.handshake.query.token)
        if (payload) {
            socket.user = payload
            // 欢迎
            socket.emit(websocketType.helloChat, createMessage(socket.user, '欢迎光临'))
            sendAll(io)
        } else {
            // 报错
            socket.emit(websocketType.error, createMessage(null, 'token过期'))
        }
        socket.on(websocketType.groupList, () => {
            // 监听前端获取用户列表
            sendAll(io)
        })
        socket.on(websocketType.groupChat, (msg) => {
            // 监听群发请求
            // io.sockets.emit(websocketType.groupChat, createMessage(socket.user, msg.data))
            // 自己不发其他人发
            socket.broadcast.emit(websocketType.groupChat, createMessage(socket.user, msg.data))
        })
        socket.on(websocketType.singleChat, (msg) => {
            // 私聊
            Array.from(io.sockets.sockets).forEach((item) => {
                if (item[1].user.username === msg.to.username) {
                    item[1].emit(websocketType.singleChat, createMessage(socket.user, msg.data))
                }
            })
        })
        socket.on('disconnect', () => {
            // 有人断联推送给所有人用户列表
            sendAll(io)
        })
    })
}
const websocketType = {
    error: 0, //错误信息
    helloChat: 1, // 欢迎
    groupList: 2, // 全局列表
    groupChat: 3, // 群聊
    singleChat: 4, // 私聊
}
function createMessage(user, data) {
    // 发送消息格式
    return {
        user,
        data,
    }
}
function sendAll(io) {
    // 发送全部在线列表
    io.sockets.emit(
        websocketType.groupList,
        createMessage(
            null,
            Array.from(io.sockets.sockets)
                .map((item) => item[1].user)
                .filter((item) => item)
        )
    )
}
module.exports = start
