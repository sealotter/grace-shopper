const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

/*
router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US']
        },
        line_items: [
            {
                price: 'price_1KxMRCEzPlA06fKFNSdnjrN1',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
    });
    // need to send session id to client side
    res.json({id: session.id});
    //res.redirect(303, session.url);
});
*/

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US']
        },
        line_items: [
            {
                price: 'price_1KxMRCEzPlA06fKFNSdnjrN1',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
    });
    // need to send session id to client side
     //res.send({ id: session.id })
    // res.json({ id: session.id });
   
    //res.redirect(303, session.url);
});

module.exports = router; 