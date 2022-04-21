const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  albumName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  albumArt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  thumbNail: {
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
  style: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  albumDetails: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  trackList: {
    type: Sequelize.ARRAY({
      //this JSON datatype might need to be changed later
      type: Sequelize.JSON,
    }),
    allowNull: true,
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  availableInventory: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Album;
