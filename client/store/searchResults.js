import axios from 'axios';

//ACTIONS------------------------
const ALBUM_SEARCH = 'ALBUM_SEARCH';
const ADD_ALBUMS = 'ADD_ALBUMS';

//Thunks-------------------------
export const albumSearch = (searchString) => {
  console.log(searchString);
  return async (dispatch) => {
    try {
      const albums = await axios.post('/api/albums/search', {
        query: searchString,
      });
      // console.log('STATUS: ', albums.status);
      if (albums.status === 201) {
        dispatch({ type: ADD_ALBUMS, albums: albums.data });
      }
      dispatch({ type: ALBUM_SEARCH, albums: albums.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer-----------------------
const searchResults = (state = [], action) => {
  if (action.type === ALBUM_SEARCH) {
    return action.albums;
  }
  return state;
};

export default searchResults;
