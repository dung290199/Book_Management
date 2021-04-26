import { Category } from '../../types/Model';
import { CATEGORIES_LOADED, CATEGORY_CREATE, CATEGORY_LOADED, CATEGORY_DELETE, CATEGORY_UPDATE } from '../type';

const initialState = {
  list: [],
  category: null,
};

const categoryReducer = (state = initialState, action: any) => {
  switch( action.type ) {
    case CATEGORIES_LOADED:
      return Object.assign({}, state, {
        list: action.payload
      });
    case CATEGORY_LOADED:
      return Object.assign({}, state, {
        category: action.payload
      });
    case CATEGORY_CREATE:
    case CATEGORY_UPDATE:
      return Object.assign({}, state, {
        list: [
          ...state.list,
          action.payload
        ]
      })
    case CATEGORY_DELETE:
      const newList = state.list.filter((category: Category) => category.id !== action.payload);
      return Object.assign({}, state, {
        list: newList
      })
    default:
      return state;
  }
}

export default categoryReducer;