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
  // getCart,
  // createCart,
  getLineItems,
} from './store';
// import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';
import auth from './store/auth';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    // window.localStorage.setItem('foo', 'bar');
    // window.localStorage.removeItem('foo');
    this.props.loadInitialData();
    this.props.getLineItems();
    this.props.loadAlbums();
    this.props.loadCarts();
    // this.props.getCart();
  }

  componentDidUpdate(prevProps) {
    console.log(window.localStorage, this.props);
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      console.log('I logged in');
      this.props.getLineItems();

      // this.props.getCart();
    }
    // if (!this.props.carts.length) {
    //   //here
    //   console.log(this.props.carts);
    //   const idForNewCart = this.props.auth.id
    //     ? { userId: this.props.auth.id }
    //     : { guestId: window.localStorage.guestId };
    //   this.props.createCart(idForNewCart);
    // }
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
    albums: state.albums,
    carts: state.carts,
    auth: state.auth,
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
    getCart: () => {
      // console.log('cart');
      return dispatch(getCart());
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
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
