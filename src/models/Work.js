const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.config');

const Work = sequelize.define('Work', {
  // Model attributes are defined here
  hours: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  date: DataTypes.DATE,
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: DataTypes.TEXT,
}, {
  // Other model options go here
  tableName: 'works',
  timestamps: false,
});

// `sequelize.define` also returns the model
console.log(Work === sequelize.models.Work); // true

exports.Work = Work;
