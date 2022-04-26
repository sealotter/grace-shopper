import React from 'react';
import { connect } from 'react-redux';
import { getLineItems } from '../store/lineItems';

const LineItems = ({ albums, lineItems, carts }) => {
  if (carts.length) {
    lineItems = lineItems.filter((x) => x.cartId === carts[0].id);
    // .map((element) => {
    //   return albums.find((album) => album.id === element.albumId);
    // });
  }

  return (
    <div>
      Items:
      <ul>
        {lineItems.map((lineItem) => {
          const album = albums.find((album) => album.id === lineItem.albumId);
          return (
            <li key={lineItem.id}>
              <div>album: {album.albumName} </div>
              <div> by: {album.artistName}</div>
              <div> quantity: {lineItem.quantity} </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default connect((state) => state)(LineItems);
