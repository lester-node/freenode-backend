const { DataTypes } = require('sequelize')

const db = require('../config/db')

const Tag = db.define("tag", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "标签名",
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    defaultValue: 1,
    comment: "0不显示，1显示",
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    defaultValue: "green", //暂时写死默认值
    comment: "颜色",
  },
  articleTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 0,
    comment: "文章正展示的数量",
  },
  articleTotalNum: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 0,
    comment: "文章全部数量",
  },
});

// Tag.sync({ alter: true });

module.exports = Tag;