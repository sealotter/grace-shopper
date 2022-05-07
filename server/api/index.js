const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/guests', require('./guests'));
router.use('/albums', require('./albums'));
router.use('/cart', require('./carts'));
router.use('/lineItems', require('./lineItems'));
router.use('/profile', require('./profile'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
