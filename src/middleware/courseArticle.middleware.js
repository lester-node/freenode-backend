//判断文章标题内容不能为空
const courseArticleValidator = async (ctx, next) => {
  const { title, content } = ctx.request.body;
  if (!title || !content) {
    ctx.body = {
      result: 1,
      message: "标题和内容不能为空",
      data: null,
    };
    return;
  }
  await next();
};

module.exports = {
  courseArticleValidator,
};
