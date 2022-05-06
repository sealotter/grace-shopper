import axios from 'axios';
import store from '.';

// constants ---------
const LOAD_CARTS = 'LOAD_CARTS';
const GET_CART = 'GET_CART';
const CREATE_CART = 'CREATE_CART';

// thunks -----------

export const loadCarts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/cart/all');
    dispatch({ type: LOAD_CARTS, carts: response.data });
  };
};

// export const getCart = () => {
//   return async (dispatch) => {
//     console.log('store ', window.localStorage);
//     const token = window.localStorage.getItem('token');
//     if (token) {
//       const response = await axios.get('/api/cart', {
//         headers: {
//           authorization: token,
//         },
//       });

//       dispatch({ type: GET_CART, carts: response.data });
//     } else if (window.localStorage.guestId) {
//       console.log('guestId is present, no need to create cart');
//       const guestId = window.localStorage.getItem('guestId');
//       const response = await axios.get(`/api/cart/${guestId}`);
//       dispatch({ type: GET_CART, carts: response.data });
//     }
//   };
// };

export const createCart = (idForNewCart) => {
  return async (dispatch) => {
    const state = store.getState();
    if (!state.selectedCart.id) {
      const newCart = await axios.post('/api/cart', {
        idForNewCart,
      });
      dispatch({ type: CREATE_CART, cart: newCart.data });
      store.dispatch({ type: 'SELECT_CART', cart: newCart.data });
    }
  };
};

// reducer ----------

const carts = (state = [], action) => {
  switch (action.type) {
    case LOAD_CARTS:
      return action.carts;
    case CREATE_CART:
      return [...state, action.cart];
  }
  // if (action.type === GET_CART) {
  //   return [action.carts];
  // }
  // if (action.type === CREATE_CART) {
  //   console.log('state', state, 'action:', action);
  //   return [...state, action.cart];
  // }
  return state;
};

export default carts;
