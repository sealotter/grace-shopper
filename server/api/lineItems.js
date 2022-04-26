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

//quantity, cartId, albumId
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    console.log(req.body);
    res.send('response-o');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
