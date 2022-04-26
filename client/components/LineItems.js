import React from 'react';
import { connect } from 'react-redux';
import { getLineItems } from '../store/lineItems';

const LineItems = ({ lineItems, carts }) => {
  console.log(carts);

  if (carts.length) {
    console.log(carts[0].id);
    lineItems = lineItems.filter((x) => x.cartId === carts[0].id);
  }
  return (
    <div>
      Items:
      <ul>
        {lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              {' '}
              album: {lineItem.albumId} x quantity: {lineItem.quantity} cartId:{' '}
              {lineItem.cartId}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default connect((state) => state)(LineItems);
