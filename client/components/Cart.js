import React from 'react';
import { connect } from 'react-redux';
import LineItems from './LineItems';

const Cart = ({ selectedCart }) => {
  return (
    <div>
      Shopping Cart:
      <div> Your cart id is: {selectedCart ? selectedCart.id : ''}. </div>
      <LineItems />
      <hr />
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatch)(Cart);
