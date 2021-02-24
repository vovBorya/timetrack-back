const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('timetrack', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

exports.sequelize = sequelize;
