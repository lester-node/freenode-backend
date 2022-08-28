const Article = require("../model/article.model");
const {
  serviceSelectOne: classifyServiceSelectOne,
  serviceUpdate: classifyServiceUpdate,
} = require("../service/classify.service");
const {
  serviceSelectOne: tagServiceSelectOne,
  serviceUpdate: tagServiceUpdate,
} = require("../service/tag.service");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class ArticleService {
  async serviceList(obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.title
      ? (sendObj.title = {
          [Op.like]: `%${sendObj.title || ""}%`,
        })
      : null;
    const res = await Article.findAll({
      where: {
        ...sendObj,
      },
    });
    let arr = res
      .map((item) => {
        if (item.show) {
          return { ...item.dataValues, name: "文章" };
        }
        return false;
      })
      .filter((value) => !!value == true);
    return arr;
  }

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

  async serviceClassifyTotal(classifyId, type, calc, num) {
    const record = await classifyServiceSelectOne(classifyId);
    switch (type) {
      case "createTrue":
        if (calc == "add") {
          return classifyServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "createFalse":
        if (calc == "add") {
          return classifyServiceUpdate({
            id: record.id,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "update":
        if (calc == "add") {
          return classifyServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
          });
        } else if (calc == "sub") {
          await classifyServiceUpdate({
            id: record.id,
            articleTotal: record.articleTotal - num,
          });
        }
        break;
      case "delete":
        if (calc == "sub") {
          await classifyServiceUpdate({
            id: record.id,
            articleTotal: record.articleTotal - num,
            articleTotalNum: record.articleTotalNum - num,
          });
        }
        break;
    }
  }

  async serviceTagTotal(tagId, type, calc, num) {
    const record = await tagServiceSelectOne(tagId);
    switch (type) {
      case "createTrue":
        if (calc == "add") {
          return tagServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "createFalse":
        if (calc == "add") {
          return tagServiceUpdate({
            id: record.id,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "update":
        if (calc == "add") {
          return tagServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
          });
        } else if (calc == "sub") {
          await tagServiceUpdate({
            id: record.id,
            articleTotal: record.articleTotal - num,
          });
        }
        break;
      case "delete":
        if (calc == "sub") {
          await tagServiceUpdate({
            id: record.id,
            articleTotal: record.articleTotal - num,
            articleTotalNum: record.articleTotalNum - num,
          });
        }
        break;
    }
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
      order: [["updatedAt", "DESC"]],
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
