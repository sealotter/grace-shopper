import axios from 'axios';

//constants
const LOAD_USERS = 'LOAD_USERS'


//thunks
export const loadUsers = () => {
  return async (dispatch) => {
     const users = (await axios.get('/api/users')).data
      dispatch({type: LOAD_USERS, users})  
  }
}


//reducer
export const users = (state = [], action) => {
  switch(action.type) {
    case LOAD_USERS: 
    return action.users
    default:
      return state
  }
}


