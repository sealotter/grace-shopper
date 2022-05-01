const router = require('express').Router();
const {
  models: { Cart, User },
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

//this is for testing and should probably be removed when no longer needed
//also url is /api/cart/all for some reason?
router.get('/all', async (req, res, next) => {
  console.log('hi');
  try {
    const allCarts = await Cart.findAll();
    res.send(allCarts);
  } catch (error) {
    next(error);
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
