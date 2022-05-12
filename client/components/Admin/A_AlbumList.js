import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAlbum } from '../../store/albums';
import A_AddAlbum from './A_AddAlbum';



const Admin_AlbumsList = ({albums, destroy}) => {
    return(
      <div>
        <A_AddAlbum />
        <ol>
          {albums.map((album) => {
            return (
              <li key={album.id}>
                <div>
                  {album.albumName}, {album.artistName}
                  <button className='delete' onClick={() => destroy(album)}>Remove</button>
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

const mapDispatch = function(dispatch) {
  return {
    destroy: (album) => {
     return dispatch(deleteAlbum(album))
    }
  }
  
}


export default connect((state) => state, mapDispatch)(Admin_AlbumsList)


