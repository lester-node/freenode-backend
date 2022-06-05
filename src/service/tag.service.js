const Tag = require("../model/tag.modal");
const { Op } = require("sequelize");

class TagService {
  async serviceCreate(obj) {
    const res = await Tag.create(obj);
    return res.dataValues;
  }

  async serviceUpdate(obj) {
    const { id } = obj;
    const res = await Tag.update(obj, { where: { id } });
    return res[0] > 0 ? true : false;
  }

  async serviceDelete(id) {
    const res = await Tag.destroy({ where: { id } });
    return res > 0 ? true : false;
  }

  async serviceEnum() {
    const res = await Tag.findAll();
    let arr = res.map((item) => {
      if (item.show) {
        return { id: item.dataValues.id, name: item.dataValues.name };
      }
    });
    return arr;
  }
}

module.exports = new TagService();
