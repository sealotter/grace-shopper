import React from 'react';
import { connect } from 'react-redux';

const AlbumDetail = ({ albums, match }) => {
  const album = albums.find((album) => album.id === match.params.id * 1);
  return <div>{album ? <div>{album.albumName}</div> : ''}</div>;
};

export default connect((state) => state)(AlbumDetail);
