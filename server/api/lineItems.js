const router = require('express').Router();
const {
  models: { LineItem, Album, User, Cart },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    // const user = await User.findByToken(req.headers.authorization);
    const userLineItems = await LineItem.findAll();

    res.send(userLineItems);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
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
    const item = await LineItem.findByPk(req.body.item.id);
    await item.update(req.body.item);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const item = await LineItem.findByPk(req.params.id);
    await item.destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
