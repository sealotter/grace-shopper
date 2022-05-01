const Sequelize = require('sequelize');
const db = require('../db');

const Guest = db.define('guest', {
  guestId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = Guest;
