//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Guest = require('./models/Guest');
const Album = require('./models/Album');
const Cart = require('./models/Cart');
const LineItem = require('./models/LineItem');
const PreviousOrder = require('./models/PreviousOrder');

//associations -----------

Cart.belongsTo(User); //, {as: 'buyer'}
User.hasMany(Cart); // , {foreignKey: 'buyerId'}

Cart.belongsTo(Guest);
Guest.hasMany(Cart);

LineItem.belongsTo(Cart);
Cart.hasMany(LineItem);

LineItem.belongsTo(Album);
Album.hasMany(LineItem);

PreviousOrder.belongsTo(User);
User.hasMany(PreviousOrder);

LineItem.belongsTo(PreviousOrder);
PreviousOrder.hasMany(LineItem);

module.exports = {
  db,
  models: {
    User,
    Guest,
    Album,
    Cart,
    LineItem,
    PreviousOrder,
  },
};
