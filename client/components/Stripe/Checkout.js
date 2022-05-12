import React from 'react';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

// deferring loadStripe for only when user is checking out
let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.STRIPE_KEY);
    }
    return stripePromise;
};

const Checkout = () => {

const checkoutOptions = {
    lineItems: [
        {price: 'price_1KyLV9EzPlA06fKFDmJk8x3X', quantity: 1},
        {price: 'price_1KyLUgEzPlA06fKFj706P4Yd', quantity: 5}
    ],
    mode: 'payment',
    successUrl: 'http://localhost:8080/checkout/success',
    cancelUrl: 'http://localhost:8080/checkout/failed',
}

const redirectToCheckout = async (session) => {
    console.log('redirectToCheckout');
    const stripe = await getStripe();
    //const { error } = await stripe.redirectToCheckout({sessionId: session.id})
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
}
    return (
        <div>
            <button onClick={redirectToCheckout}> Stripe Checkout </button>
        </div>
    )
}

export default connect((state) => state)(Checkout);

// remove button from <LineItems /> component and add it to <Checkout /> add functionality there
// need to import <Checkout /> as a component to LineItems (where the button is currently)


/*

To Do:
- [X] Pick Sample Albums for the demo and add them to the Stripe Dashboard as Products 
- [X] Edit create checkout session to include multiple line items 
- [] Add discount/promo code to Checkout? 
- [] Add Shipping To Stripe Checkout
- [] Customize Stripe Checkout layout however you want
- [X] Create Success and Cancel Redirect Components for after checkout
- [] Send email after payment confirmation?
- [] Do I need to change the API key from test key to live key?

*/