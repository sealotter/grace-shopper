const router = require('express').Router()
const { models: {LineItem, Album, User, Cart }} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        const userLineItems = await LineItem.findAll()
        //     {
        //     include : [
        //         {
        //             model: {Cart, User},
        //             where: {
        //                 cartId: Cart.id
        //             }   
        //         }
        //     ]
        // }
        console.log(userLineItems)
        res.send(userLineItems)
    }
    catch(err){
        next(err)
    }
})

module.exports = router