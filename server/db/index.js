//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Album = require('./models/Album');
const Cart = require('./models/Cart');
const LineItem = require('./models/LineItem');

//associations -----------

Cart.belongsTo(User);
User.hasMany(Cart);
LineItem.belongsTo(Cart);
Cart.hasMany(LineItem);
LineItem.belongsTo(Album);
Album.hasMany(LineItem);


module.exports = {
  db,
  models: {
    User,
    Album,
    Cart,
    LineItem
  },
};
