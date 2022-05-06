import axios from 'axios';
import history from '../history';
import store from '.';
import { createGuest } from './guests';

import { SET_AUTH, UPDATE_AUTH } from './types';
const TOKEN = 'token';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
    // } else if (!window.localStorage.guestId) {
    //   return store.dispatch(createGuest());
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      window.localStorage.removeItem('guestId');
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  store.dispatch({ type: 'DESELECT_CART' });
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_AUTH:
      return { ...state, ...action.payload };
    // return { ...state, firstName: action.payload.firstName };
    default:
      return state;
  }
}
