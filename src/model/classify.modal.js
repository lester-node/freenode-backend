const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Classify = db.define("classify", {
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
    comment: "分类名",
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    defaultValue: 1,
    comment: "0不显示，1显示",
  },
  articleTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    comment: "文章数量",
  },
});

// Classify.sync({ alter: true });

module.exports = Classify;
