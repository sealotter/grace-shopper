import axios from 'axios';

//ACTIONS------------------------
const ALBUM_SEARCH = 'ALBUM_SEARCH';

//Thunks-------------------------
export const albumSearch = (searchString) => {
  return async (dispatch) => {
    try {
      const albums = await axios.post('/api/albums/search', {
        query: 'style=Funk',
      });
      if (albums.status === 201) {
        dispatch({ type: ALBUM_SEARCH, albums: albums.data });
      }
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
};

export default searchResults;
