import axios from 'axios';
import store from '.';

// constants ---------
const LOAD_CARTS = 'LOAD_CARTS';
const CREATE_CART = 'CREATE_CART';
const UPDATE_CART = 'UPDATE_CART';

// thunks -----------

export const loadCarts = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/cart/all');
    dispatch({ type: LOAD_CARTS, carts: response.data });
  };
};

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

export const updateCart = (cart) => {
  return async (dispatch) => {
    const updatedCart = await axios.put('/api/cart', { cart });
    console.log(updatedCart.data);
    dispatch({ type: UPDATE_CART, cart: updatedCart.data });
  };
};

// reducer ----------

const carts = (state = [], action) => {
  switch (action.type) {
    case LOAD_CARTS:
      return action.carts;
    case CREATE_CART:
      return [...state, action.cart];
    case UPDATE_CART:
      return state.map((cart) =>
        cart.id === action.cart.id ? action.cart : cart
      );
  }
  return state;
};

export default carts;
