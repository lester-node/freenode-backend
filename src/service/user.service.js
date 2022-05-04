const User = require("../model/user.modal");

class UserService {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }

  async getUerInfo({ username, password }) {
    const whereOpt = {};
    username && Object.assign(whereOpt, { user_name: username });
    password && Object.assign(whereOpt, { password });

    const res = await User.findOne({
      attributes: ["user_name", "password"],
      where: whereOpt,
    });
    console.log('res',res);
    return res ? res.dataValues : null;
  }

  // async updateById({ id, user_name, password, is_admin }) {
  //   const whereOpt = { id }
  //   const newUser = {}

  //   user_name && Object.assign(newUser, { user_name })
  //   password && Object.assign(newUser, { password })
  //   is_admin && Object.assign(newUser, { is_admin })

  //   const res = await User.update(newUser, { where: whereOpt })
  //   return res[0] > 0 ? true : false
  // }
}

module.exports = new UserService();
