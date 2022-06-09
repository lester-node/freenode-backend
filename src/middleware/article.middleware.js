const { errInfo } = require("../config/constant");

//判断是否为空
const articleValidator = async (ctx, next) => {
  const { title, content } =
    ctx.request.body;
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

const idValidator = async (ctx, next) => {
  const { id } = ctx.request.body;
  if (!id) {
    ctx.body = {
      result: 1,
      message: "id不能为空",
      data: null,
    };
    return;
  }
  await next();
};

const idsValidator = async (ctx, next) => {
  const { ids } = ctx.request.body;
  if (!Array.isArray(ids)){
    ctx.body = {
      result: 1,
      message: "ids必须为数组",
      data: null,
    };
    return;
  }
  if (!ids.length) {
    ctx.body = {
      result: 1,
      message: "id不能为空",
      data: null,
    };
    return;
  }
  await next();
};

module.exports = {
  articleValidator,
  idValidator,
  idsValidator,
};
