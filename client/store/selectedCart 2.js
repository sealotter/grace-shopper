const SELECT_CART = 'SELECT_CART';
const DESELECT_CART = 'DESELECT_CART';

export const selectCart = (cart) => {
  return (dispatch) => {
    dispatch({ type: SELECT_CART, cart: cart });
  };
};

export const deselectCart = () => {
  console.log('DESELECT_CART');

  return (dispatch) => {
    dispatch({ type: DESELECT_CART, cart: {} });
  };
};

const selectedCart = (state = {}, action) => {
  switch (action.type) {
    case SELECT_CART:
      return action.cart;
    case DESELECT_CART:
      return {};
    default:
      return state;
  }
};

export default selectedCart;
