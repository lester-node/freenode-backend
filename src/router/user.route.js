const Router = require('koa-router')

const router = new Router({ prefix: '/v1/user' })

const {
  register,
  login,
  changePassword,
} = require('../controller/user.controller')

router.post("/login", login);

module.exports = router