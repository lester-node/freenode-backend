//判断文章标题内容不能为空
const courseValidator = async (ctx, next) => {
  const { name, weight } = ctx.request.body;
  if (!name || !weight) {
    ctx.body = {
      result: 1,
      message: "笔记名和权重不能为空",
      data: null,
    };
    return;
  }
  await next();
};

module.exports = {
  courseValidator,
};
