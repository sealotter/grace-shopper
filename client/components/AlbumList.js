import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumDetail from './AlbumDetail';

const AlbumList = (props) => {
  const { albums } = props;
  return (
    <div>
      <ol>
        {albums.map((album) => {
          return (
            <li key={album.id}>
              <div>
                {album.albumName}, {album.artistName}
              </div>
              <Link to={`/albums/${album.id}`}>
                <img src={album.thumbNail}></img>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default connect((state) => state)(AlbumList);
