import { AUTHORS_LOADED, AUTHOR_CREATE, AUTHOR_LOADED, AUTHOR_DELETE, AUTHOR_UPDATE } from '../type';
import { loadAPI }  from '../../utils/apiService.utils';

export const getAllAuthors = (pageNumber: string) => (dispatch: any) => {
  const params = {
    'pageNumber': pageNumber,
    'pageSize': 10
  }
  return loadAPI('/authors',params, 'GET')
          .then( res => {
            dispatch({type: AUTHORS_LOADED, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const getAuthor = (id: number) => (dispatch: any) => {
  return loadAPI(`/authors/${id}`,null, 'GET')
          .then( res => {
            dispatch({type: AUTHOR_LOADED, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const createAuthor = (data: any) => (dispatch: any) => {
  return loadAPI('/authors/',data, 'POST')
          .then( res => {
            dispatch({type: AUTHOR_CREATE, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const updateAuthor = (data: any, id: number) => (dispatch: any) => {
  return loadAPI(`/authors/${id}`,data, 'PUT')
          .then( res => {
            dispatch({type: AUTHOR_UPDATE, payload: res.data});
            return res.status;
          })
          .catch( err => err.response.status);
}

export const deleteAuthor = (id: number) => (dispatch: any) => {
  return loadAPI(`/authors/${id}`, null, 'DELETE')
          .then( res => {
            dispatch({type: AUTHOR_DELETE, payload: id});
            return res.status;
          })
          .catch( err => err.response.status);
}