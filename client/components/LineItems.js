import React from 'react';
import { connect } from 'react-redux';
import {
  updateAlbum,
  updateItem,
  deleteItem,
  createPreviousOrder,
} from '../store';
import selectedCart from '../store/selectedCart';

class LineItems extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  componentDidMount() {
    this.setState({ price: this.calculateTotal() });
  }

  handleOnChange(ev, item) {
    item.quantity = ev.target.value;
    this.props.updateItem(item);
    this.setState({ price: this.calculateTotal() });
  }

  handleRemove(item) {
    this.props.deleteItem(item);
    this.setState({ price: this.calculateTotal() });
  }

  handlePurchase() {
    const {
      lineItems,
      selectedCart,
      albums,
      updateAlbum,
      createPreviousOrder,
    } = this.props;
    const checkoutList = lineItems.filter(
      (item) => item.cartId === selectedCart.id
    );
    console.log('purchased line items', checkoutList);
    checkoutList.forEach((lineItem) => {
      const album = albums.find((album) => album.id === lineItem.albumId);
      album.availableInventory -= lineItem.quantity;
      updateAlbum(album);
    });
    selectedCart.isPurchased = true;
    // createPreviousOrder(selectedCart);
    //convert to previous order object
    //store previous order object in an table associated with the user
    //new db model, same as order but with no put or delete route
    //accessible via profile page
    //create new cart and assign to user
  }

  calculateTotal() {
    const { selectedCart, lineItems, albums } = this.props;
    // console.log('HERE', selectedCart, lineItems);
    const itemList = lineItems.filter(
      (item) => item.cartId === selectedCart.id
    );
    if (!itemList.length) return 0;
    const prices = itemList.map((item) => {
      return (
        albums.find((album) => album.id === item.albumId).price * item.quantity
      );
    });
    const total = prices.reduce((a, b) => a + b);
    return total.toFixed(2);
  }

  render() {
    console.log(this.props);
    const { albums, lineItems, selectedCart, auth } = this.props;
    return (
      <div>
        Items:
        <ul>
          {albums.length && selectedCart
            ? lineItems
                .filter((item) => item.cartId === selectedCart.id)
                .map((lineItem) => {
                  const album = albums.find(
                    (album) => album.id === lineItem.albumId
                  );
                  return (
                    <li key={lineItem.id}>
                      <img src={album.thumbNail} />
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
                      price: ${(album.price * 1).toFixed(2)} each *{' '}
                      {lineItem.quantity} = $
                      {(album.price * lineItem.quantity).toFixed(2)}
                    </li>
                  );
                })
            : 'No items in cart'}
        </ul>
        <div>total price: ${this.state.price}</div>
        <button disabled={!auth.id} onClick={this.handlePurchase}>
          complete purchase?
        </button>
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
    updateAlbum: (album) => dispatch(updateAlbum(album)),
    createPreviousOrder: (order) => dispatch(createPreviousOrder(order)),
  };
};

export default connect((state) => state, mapDispatchToProps)(LineItems);
