import React from 'react';
import { connect } from 'react-redux';
import { addLineItem } from '../store/lineItems';

const LineItems = ({ lineItems }) => {
  return (
    <div>
      Items:
      <ul>
        {lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              album no. {lineItem.albumId} x {lineItem.quantity} quantity
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addLineItem: (item) => {
      dispatch(addLineItem(item));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(LineItems);
