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
    const item = {
        price: 'price_1KxMRCEzPlA06fKFNSdnjrN1',
        quantity: 1
    };

const checkoutOptions = {
    lineItems: [item],
    mode: 'payment',
    successUrl: 'http://localhost:8080/success',
    cancelUrl: 'http://localhost:8080/cancel',
}

const redirectToCheckout = async () => {
    console.log('redirectToCheckout');
    const stripe = await getStripe();
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
