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

router.post('/', async (req, res, next) => {
  try {
    // console.log('reqbody;', req.body);
    const { cartId, albumId } = req.body;
    const newLineItem = await LineItem.create({
      cartId,
      albumId,
    });
    res.send(newLineItem);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    // console.log(req.body.item);
    const item = await LineItem.findByPk(req.body.item.id);
    // console.log(item.dataValues);
    await item.update(req.body.item);
    // console.log(item.dataValues);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
