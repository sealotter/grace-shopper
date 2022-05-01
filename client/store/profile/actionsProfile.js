import axios from 'axios';
import { READ_PROFILE } from '../types';

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
      const { data } = await axios.get(`api/profile/`, {
        params: { id: payload },
      });
      dispatch(_readProfile(data));
    } catch (error) {
      console.log({ error });
    }
  };
};
