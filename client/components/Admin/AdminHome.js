import React from 'react';
import { connect } from 'react-redux'
import { Home } from '../Home';
import UserList from './A_UserList';
//import Admin_AlbumsList from './A_AlbumList'

const AdminHome = ({ auth }) => { 
  return (
    <div>
        <h3>Hello Admin, {auth.firstName} </h3> 
        <UserList />
        <Admin_AlbumsList />
    
    </div>
      
  )
}


export default connect((state)=>state)(AdminHome)

