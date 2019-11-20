const db = require('../db');
const Sequelize = require('sequelize');

const Exercise = db.define('exercise', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imgUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Exercise;
