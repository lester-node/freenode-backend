const { DataTypes } = require("sequelize");

const db = require("../config/db");
// const Classify = require("./classify.modal");
// const Tag = require("./tag.modal");

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
    unique: true,
    comment: "文章名",
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    unique: false,
    comment: "内容",
  },
  classifyId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: "分类Id",
  },
  classifyName: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: "分类名",
  },
  tagId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
    comment: "标签id",
  },
  tagName: {
    type: DataTypes.STRING,
    allowNull: true,
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
});

// Classify.hasOne(Article, {
//   foreignKey: "classifyId",
// });
// Tag.hasMany(Article, {
//   foreignKey: "tagId",
// });

// Article.sync({ alter: true });

module.exports = Article;
