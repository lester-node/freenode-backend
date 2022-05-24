const { DataTypes } = require("sequelize");

const db = require("../config/db");
const Classify = require("./classify.modal");
const Tag = require("./tag.modal");

const Article = db.define("article", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    primaryKey: true,
    autoIncrement: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: "文章名",
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    unique: false,
    comment: "内容",
  },
  classifyName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: "分类名",
  },
  tagName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: "标签名",
  },
});

Classify.hasOne(Article, {
  foreignKey: "classifyId",
});
Tag.hasMany(Article, {
  foreignKey: "tagId",
});

module.exports = Article;
