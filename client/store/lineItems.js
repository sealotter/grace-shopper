import axios from 'axios';

// constants ------------
const GET_ITEMS = 'GET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';

// thunks -----------------

export const getLineItems = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/lineItems', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: GET_ITEMS, lineItems: response.data });
    }
  };
};

export const addLineItem = (newItem) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.post('/api/lineItems', {
        headers: {
          authorization: token,
        },
        body: newItem,
      });
      dispatch({ type: ADD_ITEM, item: response.data });
    }
  };
};

// reducer ----------------

const lineItems = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    return action.lineItems;
  }
  if (action.type === ADD_ITEM) {
    return state.concat([action.item]);
  }
  return state;
};

export default lineItems;
