const CourseArticle = require("../model/courseArticle.model");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class CourseArticleService {
  async serviceCreate(obj) {
    const res = await CourseArticle.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await CourseArticle.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(ids) {
    const res = await CourseArticle.destroy({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    });
    return res > 0 ? true : false;
  }

  async serviceSelectOne(id) {
    const res = await CourseArticle.findOne({
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
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await CourseArticle.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order: [["weight", "ASC"]],
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

module.exports = new CourseArticleService();
