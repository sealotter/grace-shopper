const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', async (req, res) => {
  console.log('You are in the profile.js');

  const profile = await User.getProfile(req.query.id);
  return res.json(profile);
});
