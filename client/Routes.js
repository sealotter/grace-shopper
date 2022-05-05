import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Cart from './components/Cart';
import {
  me,
  loadAlbums,
  loadCarts,
  createCart,
  getLineItems,
  selectCart,
} from './store';
import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    this.props.loadInitialData();
    this.props.getLineItems();
    this.props.loadAlbums();
    await this.props.loadCarts();
    //select cart here
    console.log('CDM runs');
    const { isLoggedIn, auth, carts, selectCart, selectedCart, createCart } =
      this.props;
    if (!selectedCart.id) {
      const toSelect = isLoggedIn
        ? carts.find((cart) => cart.userId === auth.id)
        : carts.find((cart) => cart.guestId === window.localStorage.guestId);
      toSelect && !selectedCart.id
        ? selectCart(toSelect)
        : isLoggedIn
        ? createCart({ userId: auth.id })
        : createCart({ guestId: window.localStorage.guestId });
    }
  }

  componentDidUpdate(prevProps) {
    console.log(window.localStorage, this.props);

    const { isLoggedIn, auth, carts, selectCart, selectedCart, createCart } =
      this.props;
    if (!prevProps.isLoggedIn && isLoggedIn) {
      console.log('I logged in');
      this.props.getLineItems();
      if (!selectedCart.id && carts.length) {
        const toSelect = isLoggedIn
          ? carts.find((cart) => cart.userId === auth.id)
          : carts.find((cart) => cart.guestId === window.localStorage.guestId);
        toSelect && !selectedCart.id
          ? selectCart(toSelect)
          : isLoggedIn
          ? createCart({ userId: auth.id })
          : createCart({ guestId: window.localStorage.guestId });
      }
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/albums/search" component={AlbumSearch} />
            <Route path="/albums/:id" component={AlbumDetail} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/albums/search" component={AlbumSearch} />
            <Route path="/albums/:id" component={AlbumDetail} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    ...state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadAlbums: () => {
      return dispatch(loadAlbums());
    },
    // getCart: () => {
    //   // console.log('cart');
    //   return dispatch(getCart());
    // },
    getLineItems: () => {
      return dispatch(getLineItems());
    },
    createCart: (id) => {
      return dispatch(createCart(id));
    },
    loadCarts: () => {
      return dispatch(loadCarts());
    },
    selectCart: (id) => {
      return dispatch(selectCart(id));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
