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
  loadGuests,
  createGuest,
  createCart,
  getLineItems,
  selectCart,
  deselectCart,
  loadUsers,
} from './store';

import Profile from './components/Profile';

import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';
import AdminHome from './components/Admin/AdminHome';
import Success from './components/Stripe/Success';
import Failed from './components/Stripe/Failed';
import Genre from './components/Genre/Genre';
import A_UserList from './components/Admin/A_UserList';
import A_AlbumDetail from './components/Admin/A_AlbumDetail';
import A_AlbumList from './components/Admin/A_AlbumList';


/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.loadGuests();
    await this.props.getLineItems();
    await this.props.loadAlbums();
    await this.props.loadCarts();
    console.log('CDM runs');
    const {
      isLoggedIn,
      auth,
      carts,
      selectCart,
      selectedCart,
      createCart,
      guests,
    } = this.props;
    if (
      (!window.localStorage.guestId && !auth.id) ||
      window.localStorage.guestId * 1 > guests.length
    )
      await this.props.createGuest();
    if (!selectedCart.id) {
      const toSelect = isLoggedIn
        ? carts.find((cart) => cart.userId === auth.id && !cart.isPurchased)
        : carts.find(
            (cart) => cart.guestId === window.localStorage.guestId * 1
          );
      toSelect || selectedCart.id
        ? selectCart(toSelect)
        : isLoggedIn
        ? createCart({ userId: auth.id })
        : createCart({ guestId: window.localStorage.guestId });
    }
  }

  async componentDidUpdate(prevProps) {
    console.log(window.localStorage, this.props);
    console.log('CDU runs');
    const {
      isLoggedIn,
      getLineItems,
      carts,
      auth,
      selectCart,
      deselectCart,
      guests,
      selectedCart,
    } = this.props;
    if (prevProps.isLoggedIn != isLoggedIn) {
      // await deselectCart();
      console.log('I logged in');
      await this.props.loadCarts();
      getLineItems();
      if (
        (!auth.id && !window.localStorage.guestId) ||
        window.localStorage.guestId * 1 > guests.length
      ) {
        await this.props.createGuest();
      }
      if (
        !selectedCart ||
        auth.id ||
        (!auth.id && window.localStorage.guestId)
      ) {
        const toSelect = isLoggedIn
          ? carts.find((cart) => cart.userId === auth.id && !cart.isPurchased)
          : carts.find(
              (cart) => cart.guestId === window.localStorage.guestId * 1
            );
        toSelect || selectedCart.id
          ? selectCart(toSelect)
          : auth.id
          ? createCart({ userId: auth.id })
          : createCart({ guestId: window.localStorage.guestId });
      }
    }
  }

  render() {
    const { isLoggedIn, users } = this.props;
    const user = users.find((u) => u.id === this.props.auth.id) || {};

    return (
      <div>
        {isLoggedIn && user.isAdmin === true ? (
          <Switch>
            <Route exact path= '/admin' component={AdminHome} />
            <Route path = '/users' component={A_UserList} />
            <Route path = '/inventory' component = {A_AlbumList} />
            <Route path="/admin/albums/:id" component={A_AlbumDetail} />
            <Redirect to ='/admin' />
          </Switch>
        ) : isLoggedIn && user.isAdmin === false ? (
          <Switch>

            <Route path='/home' component={Home} />
            <Route path='/cart' component={Cart} />
            <Route path='/profile' component={Profile} />
            <Route path='/albums/search' component={AlbumSearch} />
            <Route path='/albums/:id' component={AlbumDetail} />
            <Route path='/checkout/success' exact component={Success} />
            <Route path='/checkout/failed' exact component={Failed} />
            <Route path="/genre/:id" component={Genre} />
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
            <Route path="/genre/:id" component={Genre} />
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
      dispatch(loadUsers());
      // dispatch(loadAlbums());
      // dispatch(getCart());
      // dispatch(getLineItems());
    },
    loadAlbums: () => {
      return dispatch(loadAlbums());
    },
    loadGuests: () => {
      return dispatch(loadGuests());
    },
    getLineItems: () => {
      return dispatch(getLineItems());
    },
    createCart: (id) => {
      return dispatch(createCart(id));
    },
    loadCarts: () => {
      return dispatch(loadCarts());
    },
    selectCart: (cart) => {
      return dispatch(selectCart(cart));
    },
    deselectCart: () => dispatch(deselectCart()),
    createGuest: () => {
      return dispatch(createGuest());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
