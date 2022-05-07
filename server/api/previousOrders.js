const router = require('express').Router();
const {
  models: { PreviousOrder },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const response = await PreviousOrder.findAll();
    res.send(response);
  } catch (err) {
    next(err);
  }
});

//post not working yet
router.post('/', async (req, res, next) => {
  try {
    const order = req.body;
    const newPreviousOrder = await LineItem.create({
      order,
    });
    res.send(newPreviousOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
