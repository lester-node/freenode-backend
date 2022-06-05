const Classify = require("../model/classify.modal");
const { Op } = require("sequelize");

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

  async serviceEnum() {
    const res = await Classify.findAll();
    let arr = res.map((item) => {
      if (item.show) {
        return { id: item.dataValues.id, name: item.dataValues.name };
      }
    });
    return arr;
  }
}

module.exports = new ClassifyService();
