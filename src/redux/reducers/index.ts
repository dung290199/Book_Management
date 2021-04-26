import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import authorReducer from './authorReducer';

export const rootReducer = combineReducers({
  authReducer: authReducer,
  bookReducer: bookReducer,
  categoryReducer: categoryReducer,
  userReducer: userReducer,
  authorReducer: authorReducer,
});
