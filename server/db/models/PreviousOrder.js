const Sequelize = require('sequelize');
const db = require('../db');

const PreviousOrder = db.define('previousOrder', {
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = PreviousOrder;
