import { Book } from '../../types/Model';
import { BOOKS_LOADED, BOOK_CREATE, BOOK_DELETE, BOOK_LOADED, BOOK_UPDATE } from '../type';

const initialState = {
  list: [],
  pagination: null,
  book: null,
};

const bookReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case BOOKS_LOADED:
      return Object.assign({}, state, {
        list: action.payload.data,
        pagination: action.payload.pagination
      });
    case BOOK_LOADED:
      return Object.assign({}, state, {
        book: action.payload
      });
    case BOOK_DELETE:
      const newList = state.list.filter((book: Book) => book.id !== action.payload);
      return Object.assign({}, state, {
        list: newList
      });
    case BOOK_UPDATE:
    case BOOK_CREATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      });
    default:
      return state;
  }
}

export default bookReducer;