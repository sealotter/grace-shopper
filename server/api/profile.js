const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res) => {
  const profile = await User.getProfile(req.query.id);
  return res.json(profile);
});

router.put('/', async (req, res) => {
  const profile = await User.putProfile(req.body);
  res.send(profile);
});
