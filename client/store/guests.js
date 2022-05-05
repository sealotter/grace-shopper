import axios from 'axios';

//constants-----------------------
const LOAD_GUESTS = 'LOAD_GUESTS';
const CREATE_GUEST = 'CREATE_GUEST';

//thunks--------------------------
export const createGuest = () => {
  return async (dispatch) => {
    try {
      const newGuest = await axios.post('/api/guests');
      window.localStorage.setItem('guestId', newGuest.data.id);
      dispatch({ type: CREATE_GUEST, guest: newGuest.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer------------------------
const guests = (state = [], action) => {
  switch (action.type) {
    case CREATE_GUEST:
      return state.concat([action.guest]);
    default:
      return state;
  }
};

export default guests;
