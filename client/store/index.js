import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import albums from './albums';
import carts from './carts';
import lineItems from './lineItems';
import searchResults from './searchResults';
import { profileReducer } from './profile/reducerProfile';

const reducer = combineReducers({
  auth,
  albums,
  carts,
  lineItems,
  searchResults,
  profileReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './albums';
export * from './carts';
export * from './lineItems';
export * from './searchResults';
export * from './profile/reducerProfile';
