const jwt = require("jsonwebtoken");

//判断token是否过期
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, "freenode");
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        ctx.status = 401;
        ctx.body = {
          result: 1,
          message: "token已过期",
          data: null,
        };
        return;
      case "JsonWebTokenError":
        ctx.status = 401;
        ctx.body = {
          result: 1,
          message: "无效的token",
          data: null,
        };
        return;
    }
  }
  await next();
};

//判断是否是管理员
const hadAdminPermission = async (ctx, next) => {
  const { isAdmin } = ctx.state.user;
  if (!isAdmin) {
  }
  await next();
};

module.exports = {
  auth,
  hadAdminPermission,
};
