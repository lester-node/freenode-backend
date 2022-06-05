const { serviceEnum } = require("../service/classify.service");

class ClassifyController {
  //返回全部数据
  async classifyEnum(ctx, next) {
    try {
      const res = await serviceEnum();
      if (res) {
        ctx.body = {
          result: 0,
          message: "查询成功",
          data: res,
        };
      } else {
        throw "error";
      }
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new ClassifyController();
