import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import albums from './albums';

const reducer = combineReducers({ auth, albums });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: false }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './albums';
export * from './searchResults';
