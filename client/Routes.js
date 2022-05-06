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
  createGuest,
  createCart,
  getLineItems,
  selectCart,
  loadUsers,
  getCart,
} from './store';

import Profile from './components/Profile';

import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';
import searchResults from './store/searchResults';
import AdminHome from './components/Admin/AdminHome';
// import A_AlbumDetail from './components/Admin/A_AlbumDetail'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.getLineItems();
    await this.props.loadAlbums();
    await this.props.loadCarts();
    //select cart here
    console.log('CDM runs');
    const { isLoggedIn, auth, carts, selectCart, selectedCart, createCart } =
      this.props;
    if (!window.localStorage.guestId && !auth.id)
      await this.props.createGuest();
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

    const { isLoggedIn } = this.props;
    if (!prevProps.isLoggedIn && isLoggedIn) {
      console.log('I logged in');
      this.props.getLineItems();
    }
  }

  render() {
    const { isLoggedIn, users } = this.props;
    const user = users.find((u) => u.id === this.props.auth.id) || {}; //need empty object or else user.find will return undefined

    return (
      <div>
        {isLoggedIn && user.isAdmin === true ? (
          <Switch>
            <Route path="/admin" component={AdminHome} />
            <Route path="/admin/albums/:id" component={A_AlbumDetail} />
            <Redirect to="/admin" />
          </Switch>
        ) : isLoggedIn && user.isAdmin === false ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/profile" component={Profile} />
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
    //need all state
    ...state,
    //albums: state.albums,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(data) {
      dispatch(me());
      dispatch(loadUsers(data));
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
    createGuest: () => {
      return dispatch(createGuest());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
