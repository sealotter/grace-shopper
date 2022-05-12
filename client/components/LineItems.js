import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Checkout from './Stripe/Checkout';
import {
  updateAlbum,
  updateItem,
  deleteItem,
  createCart,
  updateCart,
  deselectCart,
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

  componentDidUpdate(prevProps) {
    const { selectedCart } = this.props;
    if (!prevProps.selectedCart.id && selectedCart.id) {
      this.setState({ price: this.calculateTotal() });
    }
  }

  handleOnChange(ev, item) {
    item.quantity = ev.target.value;
    console.log('item change', item);
    this.props.updateItem(item);
    this.setState({ price: this.calculateTotal() });
  }

  async handleRemove(item) {
    console.log(item);
    await this.props.deleteItem(item);
    this.setState({ price: this.calculateTotal() });
  }

  async handlePurchase() {
    const {
      auth,
      lineItems,
      selectedCart,
      deselectCart,
      albums,
      updateAlbum,
      updateCart,
      createCart,
    } = this.props;
    selectedCart.purchasedTotal = this.state.price;
    selectedCart.isPurchased = true;

    const checkoutList = lineItems.filter(
      (item) => item.cartId === selectedCart.id
    );
    checkoutList.forEach((lineItem) => {
      const album = albums.find((album) => album.id === lineItem.albumId);
      album.availableInventory -= lineItem.quantity;
      updateAlbum(album);
    });
    await updateCart(selectedCart);
    deselectCart();
    createCart(auth.id);
    this.setState({ price: 0 });
  }

  calculateTotal() {
    const { selectedCart, lineItems, albums } = this.props;
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
                          onClick={(ev) => {
                            ev.target.blur();
                          }}
                          onKeyDown={(ev) => ev.preventDefault()}
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
        <Checkout />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (item) => dispatch(updateItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    updateAlbum: (album) => dispatch(updateAlbum(album)),
    createCart: (id) => dispatch(createCart({ userId: id })),
    updateCart: (cart) => dispatch(updateCart(cart)),
    deselectCart: () => dispatch(deselectCart()),
  };
};

export default connect((state) => state, mapDispatchToProps)(LineItems); 

