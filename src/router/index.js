const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

//遍历当前文件夹，自动添加路由
fs.readdirSync(__dirname).forEach(file => {
  if (file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router
