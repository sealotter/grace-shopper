import React from 'react';
import { connect } from 'react-redux';

import { updateItem, deleteItem } from '../store/lineItems';

class LineItems extends React.Component {
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleOnChange(ev, item) {
    item.quantity = ev.target.value;
    this.props.updateItem(item);
  }

  handleRemove(item) {
    this.props.deleteItem(item);
  }

  render() {
    const { albums, lineItems, carts, auth } = this.props;
    let myCart = carts.find((cart) =>
      auth.id ? cart.id === auth.id : cart.id === window.localStorage.guestId
    );
    return (
      <div>
        Items:
        <ul>
          {albums.length && carts.length
            ? lineItems
                .filter((item) => item.cartId === myCart.id)
                .map((lineItem) => {
                  const album = albums.find(
                    (album) => album.id === lineItem.albumId
                  );
                  return (
                    <li key={lineItem.id}>
                      <div>
                        album: {album.albumName} id: {album.id}
                      </div>
                      <div> by: {album.artistName}</div>
                      <div>
                        quantity:{' '}
                        <input
                          type="number"
                          min={0}
                          max={album.availableInventory}
                          value={lineItem.quantity}
                          onChange={(ev) => this.handleOnChange(ev, lineItem)}
                        ></input>
                        <button onClick={() => this.handleRemove(lineItem)}>
                          remove?
                        </button>
                      </div>
                    </li>
                  );
                })
            : 'No items in cart'}
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (item) => {
      return dispatch(updateItem(item));
    },
    deleteItem: (item) => {
      return dispatch(deleteItem(item));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(LineItems);
