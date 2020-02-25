const db = require('../db');
const Sequelize = require('sequelize');

const Sets = db.define('set', {
  weight: {
    type: Sequelize.INTEGER,
  },
  weightUnit: {
    type: Sequelize.STRING,
  },
  repetitions: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Sets;
