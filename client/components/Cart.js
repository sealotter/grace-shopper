import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';

const Cart = ({ selectedCart }) => {
  console.log('selectedCart', selectedCart);
  return (
    <div>
      Shopping Cart:
      <div> Your cart id is: {selectedCart ? selectedCart.id : ''}. </div>
      <LineItems />
      <hr />
    </div>
  );
};

export default connect((state) => state)(Cart);
