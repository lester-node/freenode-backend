const { serviceRepeat } = require("../service/classify.service");

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

//判断是否重复
const repeatValidator = async (ctx, next) => {
  const { name } = ctx.request.body;
  try {
    const res = await serviceRepeat(name);
    if (!res) {
      await next();
    } else {
      ctx.body = {
        result: 1,
        message: "名称不能重复",
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
  classifyValidator,
  repeatValidator,
};
