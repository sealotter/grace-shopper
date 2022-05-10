import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const AdminHome = ({ auth, albums }) => { 
  return (
    <div>
        <h3>Hello Admin, {auth.firstName} </h3> 
        <div>
          <h3>Low Inventory:</h3>
         
            {albums.map((album) => 
            <ul key={album.id}>
              {0 < album.availableInventory && album.availableInventory < 5 ? 
              <div>    
                  {album.albumName}  
                   <span> has {album.availableInventory} left in stock</span>
                   <div>
                     <Link to={`/admin/albums/${album.id}`}>
                       <img src={album.thumbNail}></img>
                       </Link>
                    </div>
                </div>
              : ''}

             </ul>

            )}
       

        </div>
           
    </div>
      
  )
}


export default connect((state)=>state)(AdminHome)

