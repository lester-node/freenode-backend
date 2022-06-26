const bcrypt = require("bcryptjs");

const { getUerInfo } = require("../service/user.service");

//判断用户名和密码是否为空
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.body = {
      result: 1,
      message: "用户名或密码为空",
      data: null,
    };
    return;
  }
  await next();
};

//判断用户名是否存在
const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;
  try {
    const res = await getUerInfo({ username });
    if (res) {
      ctx.body = {
        result: 1,
        message: "用户名已存在",
        data: null,
      };
      return;
    }
  } catch (err) {
    console.log("校验用户名错误", err);
    ctx.body = {
      result: 1,
      message: "操作失败",
      data: null,
    };
  }
  await next();
};

//加密
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

//判断用户是否存在、密码匹配
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  try {
    const res = await getUerInfo({ username });
    if (!res) {
      ctx.body = {
        result: 1,
        message: "用户名或账号不存在",
        data: null,
      };
      return;
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.body = {
        result: 1,
        message: "密码错误",
        data: null,
      };
      return;
    }
  } catch (err) {
    console.log("校验用户名错误", err);
    ctx.body = {
      result: 1,
      message: "操作失败",
      data: null,
    };
  }
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
};
