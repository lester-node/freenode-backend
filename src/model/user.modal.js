const { DataTypes } = require('sequelize')

const db = require('../config/db')

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey:true,
    autoIncrement: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户名, 唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  isAdmin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 0,
    comment: "权限",
  },
});

// 创建数据表（第一次时）
// User.sync({ force: true })

module.exports = User