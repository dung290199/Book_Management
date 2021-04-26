import { CATEGORIES_LOADED, CATEGORY_CREATE, CATEGORY_LOADED, CATEGORY_DELETE, CATEGORY_UPDATE } from '../type';
import {loadAPI} from '../../utils/apiService.utils';

export const getAllCategories = (pageNumber: string) => (dispatch: any) => {
  const params = {
    'pageNumber': pageNumber,
    'pageSize': 10
  }
  return loadAPI('/categories/', params, 'GET')
          .then(res => {
            dispatch({type: CATEGORIES_LOADED, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const getCategory = (id: number) => (dispatch: any) => {
  return loadAPI(`/categories/${id}`, null, 'GET')
          .then(res => {
            dispatch({ type: CATEGORY_LOADED, payload: res.data });            
            return res.status;
          })
          .catch( err => err.response.status);
}

export const createCategory = (data: any) => (dispatch: any) => {
  return loadAPI('/categories/', data, 'POST')
          .then(res => {
            dispatch({type: CATEGORY_CREATE, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const updateCategory = (data: any, id: number) => (dispatch: any) => {
  return loadAPI(`/categories/${id}`, data, 'PUT')
          .then(res => {
            dispatch({type: CATEGORY_UPDATE, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const deleteCategory = (id: number) => (dispatch: any) => {
  return loadAPI(`/categories/${id}`, null, 'DELETE')
          .then(res => {
            dispatch({type: CATEGORY_DELETE, payload: id});
            return res.status;
          })
          .catch(err => err.response.status);
}