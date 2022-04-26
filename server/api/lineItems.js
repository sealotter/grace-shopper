const router = require('express').Router();
const {
  models: { LineItem, Album, User, Cart },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const userLineItems = await LineItem.findAll();
    // console.log(userLineItems)
    res.send(userLineItems);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    await LineItem.create({ cartId: 1, albumId: 420645, quantity: 1 }),
      res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
