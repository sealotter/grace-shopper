import React from 'react';
import { connect } from 'react-redux'
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
    const { albums, match, destory } = this.props;
    const album = albums.find((album) => album.id === match.params.id * 1);
    // console.log(album, 'art url: ', album.albumArt[8] === 's');
    return (
      <div>
        {album ? (
          <div>
            {album.albumArt[8] === 's' ? (
              <img src="https://i.imgur.com/ZcaIYNM.jpg" />
            ) : (
              <img src={album.albumArt} />
            )}
            <h1>{album.albumName}
            <button className='delete' onClick={() => destory(album)}>Delete</button>
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
            </div>
            
        ) : (
          ''
        )}
      </div>

    );
  }

}

const mapDispatch = function(dispatch) {
  return {
    destory: (album) => {
      dispatch(deleteAlbum(album))
    }
  }
  
}



export default connect((state) => state, mapDispatch)(A_AlbumDetail)