
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
  if (!Array.isArray(ids)) {
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
  idValidator,
  idsValidator,
};
