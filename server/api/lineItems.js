const router = require('express').Router()
const { models: {LineItem, Album, User }} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        //const lineItems = await LineItem.findAll()
        // need to identify the user first
        const user = await User.findByToken(req.headers.authorization);
        const userLineItems = await LineItem.findAll({
            where: {
                 
            }
        })
        res.send(userLineItems)
    }
    catch(err){
        next(err)
    }
})

module.exports = router