function start(server) {
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
        console.log('111')
    })
}
module.exports = start
