const path = require('path')
const Koa = require('koa')
//解析请求
const KoaBody = require('koa-body')
//处理图片
const KoaStatic = require('koa-static')
//对请求数据进行检验
const KoaParameter = require('koa-parameter')

const router = require('./router')

const app = new Koa()

app.use(
  KoaBody({
    parsedMethods: ['POST', 'GET'],
  })
)

app.use(KoaParameter(app))
app.use(router.routes()).use(router.allowedMethods())


app.listen('8000', () => {
  console.log(`server is running on http://localhost:8000`)
})