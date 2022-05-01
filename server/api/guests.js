const router = require('express').Router();
const {
  models: { Guest },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const guests = await Guest.findAll();
    res.send(guests.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
