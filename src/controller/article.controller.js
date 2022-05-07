const { getUerInfo } = require("../service/article.service");

class ArticleController {
  //注册
  async getArticleById(ctx, next) {
    const { username } = ctx.request.body;
    try {
      const res = await getUerInfo(username);
      ctx.body = {
        result: 0,
        message: "查询成功",
        data: {
          ...res
        },
      };
    } catch (err) {
      ctx.body = {
        result: 1,
        message: "操作失败",
        data: null,
      };
    }
  }
}

module.exports = new ArticleController();
