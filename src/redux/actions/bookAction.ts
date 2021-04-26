import { BOOKS_LOADED, BOOK_CREATE, BOOK_LOADED, BOOK_DELETE, BOOK_UPDATE } from '../type';
import { loadAPI } from '../../utils/apiService.utils';

export const getAllBook = (pageNumber: string) => (dispatch: any) => {
  const params = {
    'pageNumber': pageNumber,
    'pageSize': 10
  }
  return loadAPI('/books?',params, 'GET')
          .then( res => {
            dispatch({type: BOOKS_LOADED, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const getBook = (id: number) => (dispatch: any) => {
  return loadAPI(`/books/${id}`, null, 'GET')
          .then(res => {
            dispatch({type: BOOK_LOADED, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const createBook = (data: any) => (dispatch: any) => {
  return loadAPI('/books/', data, 'POST')
          .then((res) => {
            dispatch({type: BOOK_CREATE, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const updateBook = (data: any, id: number) => (dispatch: any) => {
  return loadAPI(`/books/${id}`, data, 'PUT')
          .then(res => {
            dispatch({type: BOOK_UPDATE, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const deleteBook = (id: number) => (dispatch: any) => {
  return loadAPI(`/books/${id}`, null, 'DELETE')
          .then(res => {
            dispatch({type: BOOK_DELETE, payload: id});
            return res.status;
          })
          .catch(err => err.response.status);
}
