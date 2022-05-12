import axios from 'axios';

// constants --------- 

const CREATE_CHECKOUT_SESSION = 'CREATE_CHECKOUT_SESSION';

//thunks ---------

// will dispatch the axios POST request to stripe create-checkout-session
export const createCheckoutSession = () => {
    console.log("in the thunk")
    return async (dispatch) => {
        console.log("in the dispatch")
        const response = await axios.post('/api/create-checkout-session');
        dispatch({ type: CREATE_CHECKOUT_SESSION, session: response.data });
    };
};

// reducer --------

// 'state' here is the session id, which should be returned from the post request
// post request should send back the session id that is added to the state. 

const sessions = (state = '', action) => {
    switch (action.type) {
        case CREATE_CHECKOUT_SESSION:
            console.log(state)
            return state.concat(action.session)
            //return [...state, action.session];
        default:
            return state;
    }
};

export default sessions;