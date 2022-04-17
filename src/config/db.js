const { Sequelize } = require('sequelize')

const seq = new Sequelize('freenode', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
})

// seq
//   .authenticate()
//   .then(() => {
//     console.log('数据库连接成功')
//   })
//   .catch(err => {
//     console.log('数据库连接失败', err)
//   })

module.exports = seq