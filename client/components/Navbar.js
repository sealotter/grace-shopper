
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AlbumSearch from './AlbumSearch';
import { selectCart } from '../store';

const Navbar = ({ handleClick, isLoggedIn, carts}) => {
  const userId = useSelector((state) => state.auth.id)
  const user = useSelector((state) => state.users.find((u) => u.id === userId)) || {}
   //const user = useri.find((u) => u.id === this.props.auth.id) || {}
  return(
  <div>
    <Link to="/home">
      <h1>Grace Vinyls</h1>
    </Link>
    <nav>
      {isLoggedIn && user.isAdmin === false ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/profile">profile</Link>
          <Link to="/cart">Cart(0)</Link>
          <Link to="/albums/search">Search</Link>
          <a
            href="#"
            onClick={() => {
              return handleClick();
            }}
          >
            Logout
          </a>
        </div>
      ) : isLoggedIn && user.isAdmin === true ? (
        <div>
            
          {/* The navbar will show these links after you log in */}
          <Link to="/admin">Home</Link>
          <Link to = "/users">Users</Link>
          <Link to = "/inventory">Inventory</Link>
          <a
            href="#"
            onClick={() => {
              return handleClick();
            }}
          >
            Logout
          </a>
        </div>

      ) :  (
        <div>
          {/* The navbar will show these links before you log in */}
          {/* //Oauth step 1
            When you sign up to github oauth you get a client and secret id. You need to send the id to github to identify what app is trying to login */}
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GIT_CLIENT_ID} `}
          >
            <p>Login via GitHub</p>
          </a>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart(0)</Link>
          <Link to="/albums/search">Search</Link>
        </div>
      )}
      
    </nav>
    <hr />
  </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    ...state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick(cart) {
      // need to reselect here
      // dispatch(selectCart(cart));
      return dispatch(logout(cart));
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
