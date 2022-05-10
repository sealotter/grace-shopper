import React from 'react'
import { connect } from 'react-redux'

// const UserList = ({ users, handleChange, onSubmit }) => {
class UserList extends React.Component {
  constructor() {
    super()
    this.state = {
      isAdmin : ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name] : ev.target.value
    })
  }
  onSubmit(ev) {
    ev.preventDefault()
    this.props.create({...this.state})
  }
  render() {
    const {users} = this.props
    const {handleChange, onSubmit} = this
    const {isAdmin} = this.state
    const sansAdmin = users.filter((user) => user.isAdmin === false)
  

    return(  
      <form onSubmit={ onSubmit}>
      <div>
        <ol>
          { sansAdmin.map(user => {
            console.log(user.isAdmin)
            return(
              <li key={user.id}> 
              
                {user.firstName} {user.lastName} {user.isAdmin}
                  <ol>
                    {user.email}
                    {user.address}
                    <select onChange = { handleChange } name="isAdmin" value={ isAdmin }> 
                          <option value = ''> --- Change Admin status --- </option>
                          <option value={ user.isAdmin } key={user.id}></option>
                          
                      </select>
                   <button type='submit'>Save Changes</button>


                  </ol>
              </li>
             
            )
          })}
        </ol>
      </div>
      </form>

    )
  }

} 


export default connect((state) => state)(UserList)