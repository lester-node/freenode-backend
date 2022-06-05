const Article = require("../model/article.modal");
const { Op } = require("sequelize");

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

  async serviceSelectOne(id) {
    const res = await Article.findOne({
      where: { id },
    });
    return res.dataValues;
  }

  async servicePage(pageNum, pageSize, obj) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Article.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order: [["updatedAt", "DESC"]],
      where: {
        title: {
          [Op.like]: `%${obj.title}%`,
        },
      },
    });
    return {
      total: count,
      rows,
    };
  }
}

module.exports = new ArticleService();
