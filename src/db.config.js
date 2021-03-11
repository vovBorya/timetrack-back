const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('timetrack', 'root', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

exports.sequelize = sequelize;
