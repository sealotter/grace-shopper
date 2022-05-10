import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteAlbum } from '../../store'


class A_AlbumDetail extends React.Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(album){
    const {match} = this.props
  }
  render() {
    const { albums, match } = this.props;
    const album = albums.find((album) => album.id === match.params.id * 1);
    return (
      <div>
        <Link to = {'/admin'}>Back</Link>
        {album ? (
          <div>
            {album.albumArt[8] === 's' ? (
              <img src="https://i.imgur.com/ZcaIYNM.jpg" />
            ) : (
              <img src={album.albumArt} />
            )}
            <h1>{album.albumName}
            </h1>
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
          </div>
            
        ) : (
          ''
        )}
      </div>

    );
  }

}



export default connect((state) => state)(A_AlbumDetail)