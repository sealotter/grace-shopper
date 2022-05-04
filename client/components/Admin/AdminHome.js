import React from 'react';
import { connect } from 'react-redux'
import { Home } from '../Home';

const Admin = ({auth}) => { 
  return (
    <div>
        <h1>Hello Admin, {auth.firstName} </h1> 
    
    </div>
      
  )
}


export default connect((state)=>state)(Admin)

