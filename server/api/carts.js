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

router.get('/:guestId', async (req, res, next) => {
  try {
    console.log(req.params.guestId);
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
    const idContext = req.body.idForNewCart;
    console.log('context??', idContext);
    const newCart = await Cart.create(idContext);
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
