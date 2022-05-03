import carts from './carts';

const SELECT_CART = 'SELECT_CART';

export const selectCart = (cartId) => {
  return (dispatch) => {
    const selectedCart = carts.find((cart) => cart.id === cartId);
    dispatch({ type: SELECT_CART, cart: selectedCart });
  };
};

const selectedCart = (state = {}, action) => {
  if (action.type === SELECT_CART) {
    return action.cart;
  }
  return state;
};

export default selectedCart;
