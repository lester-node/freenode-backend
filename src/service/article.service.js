const Article = require("../model/article.modal");

class ArticleService {
  async serviceCreate(obj) {
    const res = await Article.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await Article.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(id) {
    const res = await Article.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async servicePage(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Article.findAndCountAll({
      offset,
      limit: pageSize * 1,
    });
    return {
      total: count,
      rows,
    };
  }
}

module.exports = new ArticleService();
