const { serviceRepeat } = require("../service/article.service");

//判断是否为空
const articleValidator = async (ctx, next) => {
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

//判断是否重复
const repeatValidator = async (ctx, next) => {
  const { title } = ctx.request.body;
  try {
    const res = await serviceRepeat(title);
    if (!res) {
      await next();
    } else {
      ctx.body = {
        result: 1,
        message: "标题不能重复",
        data: null,
      };
    }
  } catch (err) {
    ctx.body = {
      result: 1,
      message: "操作失败",
      data: null,
    };
  }
};

module.exports = {
  articleValidator,
  repeatValidator,
};
