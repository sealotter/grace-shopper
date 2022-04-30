import axios from 'axios';
import { addAlbums } from './albums';

//ACTIONS------------------------
const ALBUM_SEARCH = 'ALBUM_SEARCH';

//Thunks-------------------------
export const albumSearch = (searchString) => {
  // console.log(searchString);
  return async (dispatch) => {
    try {
      const albums = await axios.post('/api/albums/search', {
        query: searchString,
      });
      dispatch({ type: ALBUM_SEARCH, albums: albums.data });
      if (albums.status === 201) addAlbums(albums.data);
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
