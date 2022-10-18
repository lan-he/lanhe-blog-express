const mongoose = require('mongoose')
const mongodbLink =
    'mongodb+srv://hemingxuan:3yxf86vDuewcMgqB@express-websocket.ggq5qff.mongodb.net/express-websocket?retryWrites=true&w=majority'
mongoose
    .connect(mongodbLink)
    .then(() => {
        console.log('MongoDB Success')
    })
    .catch((err) => {
        console.log(err)
    })
// 3yxf86vDuewcMgqB
