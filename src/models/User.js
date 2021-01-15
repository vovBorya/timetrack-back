const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../testdb');

class User extends Model {}

User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'User'
});

console.log(User === sequelize.models.User);