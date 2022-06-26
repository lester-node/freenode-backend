const jwt = require("jsonwebtoken");

const {
  createUser,
  getUerInfo,
} = require("../service/user.service");

class UserController {
  //注册
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    try {
      await createUser(username, password);
      ctx.body = {
        result: 0,
        message: "用户注册成功",
        data: null,
      };
    } catch (err) {
      console.log("用户注册错误", err);
      ctx.body = {
        result: 1,
        message: "用户注册失败",
        data: null,
      };
    }
  }

  //登录
  async login(ctx, next) {
    const { username } = ctx.request.body;
    try {
      const res = await getUerInfo({ username });
      const token = jwt.sign(
        { username: res.username, isAdmin: res.isAdmin },
        "freenode",
        { expiresIn: '12h' }
      );
      ctx.body = {
        result: 0,
        message: "用户登录成功",
        data: {
          username: res.username,
          token,
        },
      };
    } catch (err) {
      console.log("用户登录错误", err);
      ctx.body = {
        result: 1,
        message: "用户登录失败",
        data: null,
      };
    }
  }
}

module.exports = new UserController();
