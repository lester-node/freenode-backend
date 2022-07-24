const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("freenode", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

// const sequelize = new Sequelize("freenode", "freenode", "123456", {
//   host: "47.99.108.135",
//   dialect: "mysql",
// });

// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err)
//   })

module.exports = sequelize;