import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCheckoutSession } from '../../store';
import { loadStripe } from '@stripe/stripe-js';
import { Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

// deferring loadStripe for only when user is checking out
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_KEY);
  }
  return stripePromise;
};

const Checkout = (props) => {
  console.log(props.handlePurchase);
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
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    props.handlePurchase();
  };
  return (
    <div>
      <Button
        sx={{
          mt: 2,
          bgcolor: 'black',
          ':hover': {
            bgcolor: grey[800], // background
            color: 'white', //text
          },
        }}
        size="small"
        variant="contained"
        onClick={() => {
          redirectToCheckout();
        }}
      >
        <Typography sx={{ color: 'White' }} variant="p">
          PAY NOW
        </Typography>
      </Button>
    </div>
  );
};

export default connect((state) => state)(Checkout);
