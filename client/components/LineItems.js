import React from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../store/lineItems';

class LineItems extends React.Component {
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(ev, item) {
    item.quantity = ev.target.value;
    console.log(item);
    this.props.updateItem(item);
  }

  render() {
    const { albums, lineItems, carts } = this.props;
    if (carts.length) {
      const myLineItems = lineItems.filter((x) => x.cartId === carts[0].id);
    }
    return (
      <div>
        Items:
        <ul>
          {carts.length
            ? lineItems
                .filter((x) => x.cartId === carts[0].id)
                .map((lineItem) => {
                  const album = albums.find(
                    (album) => album.id === lineItem.albumId
                  );
                  return (
                    <li key={lineItem.id}>
                      <div>album: {album.albumName} </div>
                      <div> by: {album.artistName}</div>
                      <div>
                        quantity:{' '}
                        <input
                          type="number"
                          value={lineItem.quantity}
                          onChange={(ev) => this.handleOnChange(ev, lineItem)}
                        ></input>
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
  };
};

export default connect((state) => state, mapDispatchToProps)(LineItems);
