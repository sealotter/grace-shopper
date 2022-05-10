import React from 'react'
import { connect } from 'react-redux'
import { albumSearch, addAlbums } from '../../store';
import AlbumSearch from '../AlbumSearch';


const A_AddAlbum = () => {
  return(
    <div>
      <h3>Add Albums to Inventory</h3>
    <AlbumSearch />
    </div>
  )

}

export default connect(state => state)(A_AddAlbum)