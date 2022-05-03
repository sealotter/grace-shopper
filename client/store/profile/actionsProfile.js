import axios from 'axios';
import { READ_PROFILE, UPDATE_PROFILE, UPDATE_AUTH } from '../types';

const _updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
};
const _updateAuth = (payload) => {
  return {
    type: UPDATE_AUTH,
    payload,
  };
};

const _readProfile = (payload) => {
  console.log(payload);
  return {
    type: READ_PROFILE,
    payload,
  };
};

export const readProfile = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('api/profile/', {
        params: { id: payload },
      });
      dispatch(_readProfile(data));
    } catch (error) {
      console.log({ error });
    }
  };
};

export const updateProfile = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put('api/profile/', payload);
      dispatch(_updateProfile(data));
      console.log('this is the actions data');
      console.log(data);
      dispatch(_updateAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
};
