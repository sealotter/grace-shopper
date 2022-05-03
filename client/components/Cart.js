import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';
import { createCart } from '../store';

const Cart = ({ carts, auth, createCart }) => {
  let myCart = carts.find((cart) =>
    auth.id ? cart.id === auth.id : cart.id === window.localStorage.guestId
  );
  return (
    <div>
      Shopping Cart:
      <div> Your cart id is: {myCart ? myCart.id : ''}. </div>
      <LineItems />
      <hr />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    createCart: () => {
      dispatch(createCart());
    },
  };
};

export default connect((state) => state, mapDispatch)(Cart);
