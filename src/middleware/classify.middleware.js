//判断是否为空
const classifyValidator = async (ctx, next) => {
  const { name } = ctx.request.body;
  if (!name) {
    ctx.body = {
      result: 1,
      message: "分类名不能为空",
      data: null,
    };
    return;
  }
  await next();
};

module.exports = {
  classifyValidator,
};
