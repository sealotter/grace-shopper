import axios from 'axios';

//constants-----------------------
const LOAD_GUESTS = 'LOAD_GUESTS';
const CREATE_GUEST = 'CREATE_GUEST';

//thunks--------------------------
export const loadGuests = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/guests');
    dispatch({ type: LOAD_GUESTS, guests: response.data });
  };
};

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
    case LOAD_GUESTS:
      return action.guests;
    case CREATE_GUEST:
      return state.concat([action.guest]);
    default:
      return state;
  }
};

export default guests;
