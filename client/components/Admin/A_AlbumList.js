import React from 'react';
import {connect} from 'react-redux'
import AlbumList from '../AlbumList';
import { Link } from 'react-router-dom'
import { deleteAlbum } from '../../store'


class Admin_AlbumsList extends React.Component {

  render() {
    const {albums, destroy} = this.props

    return(
      <div>
        <ol>
          {albums.map((album) => {
            return (
              <li key={album.id}>
                <div>
                  {album.albumName}, {album.artistName}
                  <button className='delete' onClick={() => destroy(album)}>Delete</button>
                </div> 
                <Link to={`/admin/albums/${album.id}`}>
                  <img src={album.thumbNail}></img>
                </Link>  
              </li>
            );
          })}
          </ol>
      </div>

    )
  }
}

const mapDispatch = function(dispatch) {
  return {
    destroy: (album) => {
      dispatch(deleteAlbum(album))
    }
  }
  
}


export default connect((state) => state, mapDispatch)(Admin_AlbumsList)


