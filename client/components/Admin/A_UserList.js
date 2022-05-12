import React from 'react'
import { connect } from 'react-redux'

// const UserList = ({ users, handleChange, onSubmit }) => {
  const UserList = ({ users }) => {
    const sansAdmin = users.filter((user) => user.isAdmin === false)
    return (  
      <div>
        <ol>
          { sansAdmin.map(user => {
            return(
              <li key={user.id}>  
                {user.firstName} {user.lastName}
                  <ul> {user.email}</ul>
                  <ul>{user.address}</ul>
              </li>  
            )
          })}
        </ol>
      </div>
    )

  }


export default connect((state) => state)(UserList)