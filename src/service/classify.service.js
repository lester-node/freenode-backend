const Classify = require("../model/classify.model");
const { Op } = require("sequelize");
const { removeEmptyObj } = require("../config/utils");

class ClassifyService {
  async serviceCreate(obj) {
    const res = await Classify.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await Classify.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(id) {
    const res = await Classify.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async serviceSelectOne(id) {
    const res = await Classify.findOne({
      where: { id },
    });
    return res.dataValues;
  }

  async serviceList() {
    const res = await Classify.findAll();
    let arr = res.map((item) => {
      if (item.show) {
        return item;
      }
      return false
    }).filter(value => !!value == true);
    return arr;
  }

  async servicePage(pageNum, pageSize, obj) {
    let sendObj = removeEmptyObj(obj);
    sendObj.name
      ? (sendObj.name = {
          [Op.like]: `%${sendObj.name || ""}%`,
        })
      : null;
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Classify.findAndCountAll({
      offset,
      limit: pageSize * 1,
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

module.exports = new ClassifyService();
