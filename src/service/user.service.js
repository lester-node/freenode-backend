const User = require("../model/user.model");

class UserService {
  async createUser(username, password) {
    const res = await User.create({ username, password });
    return res.dataValues;
  }

  //查询用户信息
  async getUerInfo({ username, password }) {
    const whereOpt = {};
    username && Object.assign(whereOpt, { username });
    password && Object.assign(whereOpt, { password });
    const res = await User.findOne({
      attributes: ["username", "password","isAdmin"],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
}

module.exports = new UserService();
