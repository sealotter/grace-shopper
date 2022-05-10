import axios from 'axios';
import store from '.';

//constants------------------------------
const LOAD_ALBUMS = 'LOAD_ALBUMS';
const ADD_ALBUMS = 'ADD_ALBUMS';
const UPDATE_ALBUM = 'UPDATE_ALBUMS';
const DELETE_ALBUM = 'DELETE_ALBUM'

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


export const updateAlbum = (album) => {
  return async (dispatch) => {
    const updatedAlbum = axios.put('/api/albums', { album });
    dispatch({ type: UPDATE_ALBUM, album: updatedAlbum.data });
  };
};

export const deleteAlbum = (album) => {
  return async function(dispatch) {
      const res = await axios.delete(`/api/albums/admin/${album.id}`)
      dispatch({type: DELETE_ALBUM, album: res.data})

   
  }
}


//reducer-------------------------------
const albums = (state = [], action) => {
  console.log(action.type, action)
  switch (action.type) {
    case LOAD_ALBUMS:
      return action.albums;
    case ADD_ALBUMS:
      return state.concat(action.albums);
    case DELETE_ALBUM: 
    console.log(action.type)
      return state.filter((album) => album.id !== action.album.id)
    default:
      return state;
  }
};

export default albums;
