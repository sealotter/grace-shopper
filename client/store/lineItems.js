import axios from 'axios';

// constants ------------

const GET_ITEMS = 'GET_ITEMS';

// thunks -----------------

export const getLineItems = () => {
    return async(dispatch) => {
        const token = window.localStorage.getItem('token');
        if(token) {
            const response = await axios.get('/api/')
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