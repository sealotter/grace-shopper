const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

module.exports = LineItem;  
