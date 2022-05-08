const { DataTypes } = require('sequelize')

const db = require('../config/db')

const Article = db.define("article", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey:true,
    autoIncrement: false,
  },
});

// 创建数据表（第一次时）
// User.sync({ force: true })

module.exports = Article;