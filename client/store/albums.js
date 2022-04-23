import axios from 'axios';
// import Album from '../../server/db/models/Album';

//constants------------------------------
const LOAD_ALBUMS = 'LOAD_ALBUMS';
const ALBUM_SEARCH = 'ALBUM_SEARCH';

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

export const albumSearch = (searchString) => {
  return async (dispatch) => {
    try {
      const albums = (
        await axios.post('/api/albums/search', { query: 'style=Funk' })
      ).data;
      dispatch({ type: ALBUM_SEARCH, albums });
    } catch (error) {
      console.log(error);
    }
  };
};

//reducer-------------------------------
const albums = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALBUMS:
      return action.albums;
    case ALBUM_SEARCH:
      return state.concat(action.albums);
    default:
      return state;
  }
};

export default albums;
