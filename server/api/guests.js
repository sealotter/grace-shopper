const router = require('express').Router();
const {
  models: { Guest },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const guests = await Guest.findAll();
    res.send(guests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const guest = await Guest.findByPk(req.params.id);
    res.send(guest);
  } catch (error) {
    next(error);
  }
});

//curl -X POST http://localhost:8080/api/guests -H "Content-Type: application/json" -d  '{"body":"test"}'
router.post('/', async (req, res, next) => {
  try {
    const guest = await Guest.create();
    res.send(guest);
  } catch (error) {
    next(error);
  }
});

router.post;

module.exports = router;
