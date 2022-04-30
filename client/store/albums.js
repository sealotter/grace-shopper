import axios from 'axios';
import store from '.';

//constants------------------------------
const LOAD_ALBUMS = 'LOAD_ALBUMS';
const ADD_ALBUMS = 'ADD_ALBUMS';

//thunks---------------------------------
export const loadAlbums = () => {
  return async (dispatch) => {
    try {
      const albums = (await axios.get('/api/albums')).data;
      dispatch({ type: LOAD_ALBUMS, albums });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAlbums = (searchResults) => {
  store.dispatch({ type: ADD_ALBUMS, albums: searchResults });
};

//reducer-------------------------------
const albums = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALBUMS:
      return action.albums;
    case ADD_ALBUMS:
      return state.concat(action.albums);
    default:
      return state;
  }
};

export default albums;
