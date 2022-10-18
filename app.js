var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
var expandRouter = require('./routes/expand')
const JWT = require('./util/jwt')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    // token校验中间件
    console.log(req.url)
    if (req.url.includes('login') || req.url.includes('logon')) {
        next()
        return
    }
    const token = req.headers['authorization']
    if (token && JWT.verify(token)) {
        console.log('已经登陆')
        next()
    } else {
        res.send({
            code: 401,
        })
    }
})
// 注册session中间件
// app.use(
//     session({
//         name: 'express-test',
//         secret: 'express-test-session', // 服务器生成 session 的签名
//         resave: true, // true 为请求重制时间
//         saveUninitialized: true, //强制将为初始化的 session 存储
//         cookie: {
//             maxAge: 1000 * 60 * 10, // 过期时间
//             secure: false, // 为 true 时候表示只有 https 协议才能访问cookie
//         },
//     })
// )

app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/expand', expandRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
