import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCheckoutSession } from '../../store';
import { loadStripe } from '@stripe/stripe-js';

// deferring loadStripe for only when user is checking out
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_KEY);
  }
  return stripePromise;
};

const Checkout = ({ handlePurchase }) => {
  const checkoutOptions = {
    lineItems: [
      { price: 'price_1KyLV9EzPlA06fKFDmJk8x3X', quantity: 1 },
      { price: 'price_1KyLUgEzPlA06fKFj706P4Yd', quantity: 5 },
    ],
    mode: 'payment',
    successUrl: 'http://localhost:8080/checkout/success',
    cancelUrl: 'http://localhost:8080/checkout/failed',
  };

  const redirectToCheckout = async (session) => {
    handlePurchase();
    console.log('redirectToCheckout');
    const stripe = await getStripe();
    //const { error } = await stripe.redirectToCheckout({sessionId: session.id})
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
  };
  return (
    <div>
      <button onClick={redirectToCheckout}> Stripe Checkout </button>
    </div>
  );
};

export default connect((state) => state)(Checkout);
