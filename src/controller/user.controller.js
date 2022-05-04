const jwt = require('jsonwebtoken')

const {
  createUser,
  getUerInfo,
  updateById,
} = require('../service/user.service')

// const { userRegisterError } = require('../constant/err.type')

// const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body

    try {
      const res = await createUser(user_name, password)
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', {
        code:'500',
        message:'123321',
        result:''
      }, ctx)
    }
  }

  async login(ctx, next) {
    const { username, password } = ctx.request.body;
    try {
      const {  } = await getUerInfo({ username, password });

      ctx.body = {
        result:0,
        message: '用户登录成功',
        data:{

        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
      ctx.body = {
        result:1,
        message: "用户登录失败",
        data:null
      };
    }
  }

  // async changePassword(ctx, next) {
  //   // 1. 获取数据
  //   const id = ctx.state.user.id
  //   const password = ctx.request.body.password

  //   // 2. 操作数据库
  //   if (await updateById({ id, password })) {
  //     ctx.body = {
  //       code: 0,
  //       message: '修改密码成功',
  //       result: '',
  //     }
  //   } else {
  //     ctx.body = {
  //       code: '10007',
  //       message: '修改密码失败',
  //       result: '',
  //     }
  //   }
  //   // 3. 返回结果
  // }
}

module.exports = new UserController()
