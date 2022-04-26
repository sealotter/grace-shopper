import axios from 'axios';

// constants ------------

const GET_ITEMS = 'GET_ITEMS';

// thunks -----------------

export const getLineItems = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token) {
            const response = await axios.get('/api/lineItems', {
                headers: {
                    authorization: token
                }
            });
            dispatch({ type: GET_ITEMS, lineItems: response.data})
        }
    }
}

// reducer ----------------

const lineItems = (state = [], action) => {
    if (action.type === 'GET_ITEMS'){
        return action.lineItems;
    }
    return state;
}

export default lineItems; 