const Course = require("../model/course.model");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class CourseService {
  async serviceList() {
    const res = await Course.findAll();
    let arr = res
      .map((item) => {
        if (item.show) {
          return item;
        }
        return false;
      })
      .filter((value) => !!value == true);
    return arr;
  }

  async serviceCreate(obj) {
    const res = await Course.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await Course.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(ids) {
    const res = await Course.destroy({
      where: {
        id: {
          [Op.or]: ids,
        },
      },
    });
    return res > 0 ? true : false;
  }

  async serviceSelectOne(id) {
    const res = await Course.findOne({
      where: { id },
    });
    return res.dataValues;
  }

  async servicePage(pageNum, pageSize, obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.name
      ? (sendObj.name = {
          [Op.like]: `%${sendObj.name || ""}%`,
        })
      : null;
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Course.findAndCountAll({
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

module.exports = new CourseService();
