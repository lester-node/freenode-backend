const Router = require('koa-router')

const router = new Router({ prefix: '/user' })

const {
  register,
  login,
  changePassword,
} = require('../controller/user.controller')

router.post('/', register)

module.exports = router