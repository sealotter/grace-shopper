import React from 'react';
import {connect} from 'react-redux'
import AlbumList from '../AlbumList';
import { Link } from 'react-router-dom'


class Admin_AlbumsList extends React.Component {

  render() {
    const {albums} = this.props
    
    return(
      <div>
        <ol>
          {albums.map((album) => {
            return (
              <li key={album.id}>
                <div>
                  {album.albumName}, {album.artistName}
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


export default connect((state) => state)(Admin_AlbumsList)


