const router = require('express').Router();
const {
  models: { Cart, LineItem, User },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    const userCart = await Cart.findAll({
      where: {
        userId: user.id,
      },
    });
    res.send(userCart);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create();
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
