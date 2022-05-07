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
        ctx.throw(401, "token已过期");
      case "JsonWebTokenError":
        ctx.throw(401, "无效的token");
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
