const Sequelize = require('sequelize');
const db = require('../db');

const Guest = db.define('guest', {});

module.exports = Guest;
