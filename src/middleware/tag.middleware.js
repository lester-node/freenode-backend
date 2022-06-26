//判断标签是否为空
const tagValidator = async (ctx, next) => {
  const { name } = ctx.request.body;
  if (!name) {
    ctx.body = {
      result: 1,
      message: "标签名不能为空",
      data: null,
    };
    return;
  }
  await next();
};

module.exports = {
  tagValidator,
};
