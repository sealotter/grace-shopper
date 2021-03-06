import axios from 'axios';

// constants ------------
const GET_ITEMS = 'GET_ITEMS';

const CREATE_ITEM = 'CREATE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

// thunks -----------------

export const getLineItems = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/lineItems');
    dispatch({ type: GET_ITEMS, lineItems: response.data });
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

export const deleteItem = (item) => {
  return async (dispatch) => {
    const response = await axios.delete(`/api/lineItems/${item.id}`);
    dispatch({ type: DELETE_ITEM, item: response.data });
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
  if (action.type === DELETE_ITEM) {
    return state.filter((item) => item.id !== action.item.id);
  }

  return state;
};

export default lineItems;
