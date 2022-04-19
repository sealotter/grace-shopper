import React from 'react';
import { connect } from 'react-redux';

const AlbumList = ({ albums }) => {
  // console.log(props);
  return (
    <ol>
      {albums.map((album, i) => {
        return (
          <li key={album.id}>
            <div>
              {album.albumName}, {album.artistName}
            </div>
            <img src={album.thumbNail}></img>
          </li>
        );
      })}
    </ol>
  );
};

export default connect((state) => state)(AlbumList);
