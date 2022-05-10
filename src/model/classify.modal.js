const { DataTypes } = require('sequelize')

const db = require('../config/db')

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
});

module.exports = Classify;