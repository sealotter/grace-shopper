import React from 'react';
import { connect } from 'react-redux'
import EditAlbum from './A_Edit'
import { Route }from 'react-router-dom'


const A_AlbumDetail = ({ album }) => {
  
  return (
    <div>
      <h1>{album ? album.albumName : 'album'}</h1>
      <div>
        {album ? (
          <div>
            {album.albumArt[8] === 's' ? (
              <img src="https://i.imgur.com/ZcaIYNM.jpg" />
            ) : (
              <img src={album.albumArt} />
            )}
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
            <div>Available Inventory: {album.availableInventory}</div>
            <div>
              Current Price: {album.price ? `$${album.price}` : 'unavailable'}
              <Route path = '/admin/albums/:id' component = { EditAlbum } />
            </div>
            
          
          </div>
        ) : (
          ''
        )}
      </div>
      
    </div>
  )

}


const mapState = ({albums}, {match}) => {
  const album = albums.find(a => a.id === match.params.id*1)
  
  return {
   album
  }
}

export default connect(mapState)(A_AlbumDetail)