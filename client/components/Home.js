import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadAlbums } from '../store/albums';

/**
 * COMPONENT
 */
export const Home = ({ auth, albums, loadAlbums }) => {
  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div>
      <h3>Welcome, {auth.username}</h3>
      <div>{albums.length}</div>
      <ol>
        {albums.map((x, i) => {
          return (
            <li key={i}>
              {x.albumName}, {x.artistName}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapDispatchToProps = (dispatch) => {
  return {
    loadAlbums: () => {
      return dispatch(loadAlbums());
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(Home);
