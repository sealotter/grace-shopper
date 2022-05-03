import axios from 'axios';

// constants ------------

const CREATE_USER = 'CREATE_USER';

// thunks ---------------

export const createUser = () => {
    return async (dispatch) => {
        const response = await axios.post('/api/users', {
            username,
            password
        });
        dispatch({ type: CREATE_USER, user: response.data });
    };
}

// reducer ----------------

const users = (state = [], action) => {
    if (action.type === CREATE_USER) {
        return action.users;
    }
    return state;
};

export default users; 