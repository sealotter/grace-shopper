const router = require('express').Router();
const {
  models: { Cart, User, Guest },
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
  try {
    const allCarts = await Cart.findAll();
    res.send(allCarts);
  } catch (error) {
    next(error);
  }
});

router.get('/:guestId', async (req, res, next) => {
  try {
    console.log('guesttId at route: ', req.params.guestId);
    const guest = await Guest.findByPk(req.params.guestId);
    const guestCart = await Cart.findOne({
      where: {
        guestId: guest.id,
      },
    });
    res.send(guestCart);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const idContext = req.body.idForNewCart;
    const newCart = await Cart.create(idContext);
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.body.cart.id);
    await cart.update(req.body.cart);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
