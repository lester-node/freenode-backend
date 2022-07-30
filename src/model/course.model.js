const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Course = db.define("course", {
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
    comment: "教程名",
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
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    defaultValue: 0,
    comment: "权重",
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    defaultValue: 1,
    comment: "0不显示，1显示",
  },
});

// Course.sync({ alter: true });

module.exports = Course;
