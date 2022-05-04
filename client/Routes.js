import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Cart from './components/Cart';

import Profile from './components/Profile';

import { me, loadAlbums, getCart, getLineItems, loadUsers } from './store';

import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';
import Admin from './components/Admin/AdminHome';
import searchResults from './store/searchResults';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    //console.log(this.props)
    this.props.loadInitialData();
    this.props.loadAlbums();
    this.props.getLineItems();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      console.log('I logged in');
      this.props.getCart();
      this.props.getLineItems();
    } 
  }

  render() {
    const { isLoggedIn, users } = this.props;
    const user = users.find((u) => u.id === this.props.auth.id) || {}; //need empty object or else user.find will return undefined 

    return (
      <div>
        { isLoggedIn && user.isAdmin === true ? (
          <Switch>
            <Route path= "/admin" component={Admin} />
            <Redirect to ="/admin" />
          </Switch>

        ) : isLoggedIn && user.isAdmin === false ? (
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/cart' component={Cart} />
            <Route path='/profile' component={Profile} />
            <Route path='/albums/search' component={AlbumSearch} />
            <Route path='/albums/:id' component={AlbumDetail} />
            <Redirect to='/home' />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/cart' component={Cart} />
            <Route path='/albums/search' component={AlbumSearch} />
            <Route path='/albums/:id' component={AlbumDetail} />
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
    ...state
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
    getCart: () => {
      // console.log('cart');
      return dispatch(getCart());
    },
    getLineItems: () => {
      return dispatch(getLineItems());
    }
   
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
