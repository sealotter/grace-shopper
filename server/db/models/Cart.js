const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  purchasedTotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

module.exports = Cart;
