import axios from 'axios';

// constants ------------

const GET_ITEMS = 'GET_ITEMS';
const CREATE_ITEM = 'CREATE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

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

export const createItem = (cartId, albumId) => {
  return async (dispatch) => {
    const response = await axios.post('/api/lineItems', {
      cartId,
      albumId,
    });
    dispatch({ type: CREATE_ITEM, item: response.data });
  };
};

export const updateItem = (item) => {
  return async (dispatch) => {
    const response = await axios.put('/api/lineItems', { item });
    dispatch({ type: UPDATE_ITEM, item: response.data });
  };
};

// reducer ----------------

const lineItems = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    return action.lineItems;
  }
  if (action.type === CREATE_ITEM) {
    return state.concat([action.item]);
  }
  if (action.type === UPDATE_ITEM) {
    return state.map((item) => {
      return item.id === action.item.id ? action.item : item;
    });
  }
  return state;
};

export default lineItems;
