import axios from 'axios';

const LOAD_PREV_ORDERS = 'LOAD_PREV_ORDERS';
const CREATE_PREV_ORDER = 'CREATE_PREV_ORDER';

export const loadPreviousOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/previousOrders');
    dispatch({ type: LOAD_PREV_ORDERS, previousOrders: response.data });
  };
};

export const createPreviousOrder = (order) => {
  console.log('>>>>', order);
  return async (dispatch) => {
    const response = await axios.post('/api/previousOrders', { order });
    console.log(response.data); //no userId here???
    dispatch({ type: CREATE_PREV_ORDER, previousOrder: response.data });
  };
};

const previousOrders = (state = [], action) => {
  switch (action.type) {
    case LOAD_PREV_ORDERS:
      return action.previousOrders;
    case CREATE_PREV_ORDER:
      return [...state, action.previousOrder];
    default:
      return state;
  }
};

export default previousOrders;
