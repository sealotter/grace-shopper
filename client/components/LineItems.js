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
import { Container, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

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

    this.props.updateItem(item);
    this.setState({ price: this.calculateTotal() });
  }

  async handleRemove(item) {
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
      <Container maxWidth='xl'>
        <Grid
          sx={{
            my: 2,
            bgcolor: grey[300],
            py: 2,
            display: { xs: 'none', md: 'flex' },
          }}
          container
        >
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            ALBUM
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            NAME
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            ARTIST
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            QUANTITY
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            PRICE
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            TOTAL
          </Grid>
        </Grid>

        <div>
          {albums.length && selectedCart
            ? lineItems
                .filter((item) => item.cartId === selectedCart.id)
                .map((lineItem) => {
                  const album = albums.find(
                    (album) => album.id === lineItem.albumId
                  );
                  return (
                    <div key={lineItem.id}>
                      <Grid container spacing={3}>
                        <Grid
                          sx={{
                            my: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          column
                          xs={12}
                          md={2}
                        >
                          <img src={album.thumbNail} />
                        </Grid>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          xs={12}
                          md={2}
                        >
                          {album.albumName} id: {album.id}
                        </Grid>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          xs={12}
                          md={2}
                        >
                          {album.artistName}
                        </Grid>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          xs={12}
                          md={2}
                        >
                          <div>
                            <input
                              type='number'
                              min={0}
                              max={album.availableInventory}
                              value={lineItem.quantity}
                              onClick={(ev) => {
                                ev.target.blur();
                              }}
                              onKeyDown={(ev) => ev.preventDefault()}
                              onChange={(ev) =>
                                this.handleOnChange(ev, lineItem)
                              }
                            ></input>
                            <button onClick={() => this.handleRemove(lineItem)}>
                              REMOVE
                            </button>
                          </div>
                        </Grid>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          column
                          xs={12}
                          md={2}
                        >
                          ${(album.price * 1).toFixed(2)} each
                        </Grid>
                        <Grid
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                          }}
                          item
                          column
                          xs={12}
                          md={2}
                        >
                          {(album.price * lineItem.quantity).toFixed(2)}
                        </Grid>
                      </Grid>
                    </div>
                  );
                })
            : 'No items in cart'}
        </div>
        <Grid sx={{ my: 2, bgcolor: grey[300], py: 2 }} container>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            ${this.state.price}
          </Grid>
        </Grid>
        <Grid sx={{ py: 2 }} container>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          ></Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            item
            xs={2}
            md={2}
          >
            <Checkout handlePurchase={this.handlePurchase} />
          </Grid>
        </Grid>
      </Container>
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
