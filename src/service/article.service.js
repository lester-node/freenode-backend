const Article = require("../model/article.modal");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

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

  async serviceDelete(ids) {
    const res = await Article.destroy({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    });
    return res > 0 ? true : false;
  }

  async serviceSelectOne(id) {
    const res = await Article.findOne({
      where: { id },
    });
    return res.dataValues;
  }

  async servicePage(pageNum, pageSize, obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.title
      ? (sendObj.title = {
          [Op.like]: `%${sendObj.title || ""}%`,
        })
      : null;
    sendObj.tagId
      ? (sendObj.tagId = {
          [Op.like]: `%${sendObj.tagId || ""}%`,
        })
      : null;
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Article.findAndCountAll({
      offset,
      limit: pageSize * 1,
      // order: [["updatedAt", "DESC"]],
      where: {
        ...sendObj,
      },
    });
    return {
      total: count,
      rows,
    };
  }
}

module.exports = new ArticleService();
