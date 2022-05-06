import React from 'react'
import {connect } from 'react-redux'

const UserList = ({ users }) => {
    const sansAdmin = users.filter((user) => user.isAdmin === false)

    return(   
      <div>
        <ol>
          { sansAdmin.map(user => {
            return(
              <li key={user.id}>
                {user.firstName} {user.lastName}
                  <ol>
                    {user.email}
                    {user.address}
                  </ol>
              </li>
            )
          })}
        </ol>
      </div>

    )

} 


export default connect((state) => state)(UserList)