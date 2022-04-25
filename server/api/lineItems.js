const router = require('express').Router()
const { models: {LineItem, Album, User }} = require('../db')

router.get('/', async (req, res, next) => {
    try {
        const user = await User.findByToken(req.headers.authorization);
        const userLineItems = await LineItem.findAll({
            where: {
                 // finish here 
            }
        })
        res.send(userLineItems)
    }
    catch(err){
        next(err)
    }
})

module.exports = router