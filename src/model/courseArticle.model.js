const { DataTypes } = require("sequelize");

const db = require("../config/db");

const CourseArticle = db.define("coursearticle", {
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
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    defaultValue: 0,
    comment: "权重",
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: "教程id",
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: "教程名",
  },
  show: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    defaultValue: 1,
    comment: "0不显示，1显示",
  },
});

// CourseArticle.sync({ alter: true });

module.exports = CourseArticle;
