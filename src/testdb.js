const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('test_mydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  }
);

exports.sequelize = sequelize;

//Testing the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection done');
  } catch (err) {
    console.log("Error", err);
  }
})();
