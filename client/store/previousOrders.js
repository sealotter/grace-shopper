import axios from 'axios';

const LOAD_PREV_ORDERS = 'LOAD_PREV_ORDERS';
const CREATE_PREV_ORDER = 'CREATE_PREV_ORDER';

export const loadPreviousOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/previousOrders');
    dispatch({ type: LOAD_PREV_ORDERS, previousOrders: response.data });
  };
};

const previousOrders = (state = [], action) => {
  switch (action.type) {
    case LOAD_PREV_ORDERS:
      return action.previousOrders;
    default:
      return state;
  }
};

export default previousOrders;
