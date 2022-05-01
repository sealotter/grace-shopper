import axios from 'axios';

// constants ---------

const GET_CART = 'GET_CART';
const CREATE_CART = 'CREATE_CART';

// thunks -----------

export const getCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      const response = await axios.get('/api/cart', {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: 'GET_CART', carts: response.data });
      // } else if (!window.localStorage.cartId) {
      //   const newCart = await axios.post('/api/cart');
      //   window.localStorage.setItem('GuestCartId', newCart.data.id);
      //   console.log(newCart);
      //   dispatch({ type: CREATE_CART, cart: newCart.data });
    }
  };
};

// reducer ----------

const carts = (state = [], action) => {
  if (action.type === GET_CART) {
    return action.carts;
  }
  if (action.type === CREATE_CART) {
    return state.concat([action.cart]);
  }
  return state;
};

export default carts;
