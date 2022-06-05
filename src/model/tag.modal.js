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
    unique: false,
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
    comment: "颜色",
  },
});

// Tag.sync({ alter: true });

module.exports = Tag;