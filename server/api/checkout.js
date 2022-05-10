const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);


router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
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
    res.redirect(303, session.url);
});

module.exports = router; 