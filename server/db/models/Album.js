const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  albumName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  artistName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  decade: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  albumDetails: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  trackList: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  availableInventory: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Album;
