import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const AlbumDetail = ({ albums, match }) => {
  const location = useLocation();
  console.log(match);
  const album = albums.find((album) => album.id === match.params.id * 1);
  return <div>{album ? <div>{album.albumName}</div> : ''}</div>;
};

export default connect((state) => state)(AlbumDetail);
