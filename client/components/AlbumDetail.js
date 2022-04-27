import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../store';

class AlbumDetail extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { carts, match } = this.props;
    this.props.createItem(carts[0].id, match.params.id * 1);
  }

  render() {
    console.log(this.props);
    const { albums, match } = this.props;
    const album = albums.find((album) => album.id === match.params.id * 1);
    return (
      <div>
        {album ? (
          <div>
            <img src={album.albumArt} />
            <h1>{album.albumName}</h1>
            <div>
              {album.year} release by {album.artistName}
            </div>
            <div>
              genre: {album.genre} | style: {album.style ? album.style : 'n/a'}
            </div>
            <ul>
              {album.trackList.map((track, i) => (
                <li key={i}>
                  {track.position}: {track.title}
                </li>
              ))}
            </ul>
            <div>
              {album.albumDetails ? `Album Details: ${album.albumDetails}` : ''}
            </div>
            <div>
              Community Rating:{' '}
              {album.rating ? `${album.rating} / 5` : 'unavilable'}
            </div>
            <div>
              Current Price: {album.price ? `$${album.price}` : 'unavailable'}
            </div>
            <div>Available Inventory: {album.availableInventory}</div>
            {album.availableInventory > 0 ? (
              <button onClick={this.handleOnClick}>Add to Cart</button>
            ) : (
              'Not available for purchase at this time'
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (cartId, albumId) => {
      return dispatch(createItem(cartId, albumId));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(AlbumDetail);
