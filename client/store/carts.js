import axios from 'axios';

// constants ---------

const LOAD_CART = 'GET_CART';

// thunks -----------

export const getCart = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token) {
            const response = await axios.get('/api/cart', {
                headers: {
                    authorization: token
                }
            });
            //console.log(dispatch)
            dispatch({ type: 'GET_CART', carts: response.data})
        }
    }
}

// reducer ----------

const carts = (state = [], action) => {
    if (action.type === 'GET_CART') {
        return action.carts;
    }; 
    return state;
}


export default carts;