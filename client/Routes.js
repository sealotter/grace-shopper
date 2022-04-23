import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me, loadAlbums } from './store';
import AlbumList from './components/AlbumList';
import AlbumDetail from './components/AlbumDetail';
import AlbumSearch from './components/AlbumSearch';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadAlbums();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <div>
            {/* <Switch> */}
            <Home />
            {/* <Route path="/home" component={Home} /> */}
            {/* <Redirect to="/home" /> */}
            {/* </Switch> */}
          </div>
        ) : (
          <div>
            <Switch>
              <Login />
              <Signup />
              {/* <Route path="/" exact component={Login} /> */}
              {/* <Route path="/login" component={Login} /> */}
              {/* <Route path="/signup" component={Signup} /> */}
            </Switch>
          </div>
        )}
        <Switch>
          <Route path="/albums/search" component={AlbumSearch} />
          <Route path="/albums/:id" component={AlbumDetail} />
          <Route path="/" component={AlbumList} />
        </Switch>
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
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
