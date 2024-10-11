const responseMiddleware = (req, res, next) => {
    // 为 res 对象添加自定义的响应方法
    res.sendResponse = (data, msg = 'success', code = 200) => {
        res.status(code).json({
            code: code,
            msg: msg,
            data: data,
        })
    }

    next()
}
module.exports = responseMiddleware
