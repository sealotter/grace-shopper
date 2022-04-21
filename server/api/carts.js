const router = require('express').Router()
const { models: { Cart, User }} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        // need to identify the user first
        const user = await User.findByToken(req.headers.authorization);

        const userCart = await Cart.findAll({
            where: {
                userId: user.id
            }
        })
        res.send(userCart)
    }
    catch(err){
        next(err)
    }
})

module.exports = router