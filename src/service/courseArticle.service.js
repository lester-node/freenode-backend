const CourseArticle = require("../model/courseArticle.model");
const {
  serviceSelectOne: courseServiceSelectOne,
  serviceUpdate: courseServiceUpdate,
} = require("../service/course.service");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class CourseArticleService {
  async serviceList(obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.title
      ? (sendObj.title = {
          [Op.like]: `%${sendObj.title || ""}%`,
        })
      : null;
    const res = await CourseArticle.findAll({
      where: {
        ...sendObj,
      },
    });
    let arr = res
      .map((item) => {
        if (item.show) {
          return { ...item.dataValues, name: "教程" };
        }
        return false;
      })
      .filter((value) => !!value == true);
    return arr;
  }

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

  async serviceCourseTotal(courseId, type, calc, num) {
    const record = await courseServiceSelectOne(courseId);
    switch (type) {
      case "createTrue":
        if (calc == "add") {
          return courseServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "createFalse":
        if (calc == "add") {
          return courseServiceUpdate({
            id: record.id,
            articleTotalNum: ++record.articleTotalNum,
          });
        }
        break;
      case "update":
        if (calc == "add") {
          return courseServiceUpdate({
            id: record.id,
            articleTotal: ++record.articleTotal,
          });
        } else if (calc == "sub") {
          await courseServiceUpdate({
            id: record.id,
            articleTotal: record.articleTotal - num,
          });
        }
        break;
      case "delete":
        if (calc == "sub") {
          await courseServiceUpdate({
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
