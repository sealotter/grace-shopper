const router = require('express').Router();
const axios = require('axios');
const {
  models: { Album },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await Album.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
