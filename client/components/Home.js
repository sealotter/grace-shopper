import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAlbums } from '../store/albums';

/**
 * COMPONENT
 */
export const Home = ({ auth, albums, loadAlbums }) => {
  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */

export default connect((state) => state)(Home);
