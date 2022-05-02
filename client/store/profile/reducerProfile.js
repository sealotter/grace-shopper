const { READ_PROFILE, UPDATE_PROFILE } = require('../types');

const initialState = {
  loading: false,
  error: '',
  profile: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
