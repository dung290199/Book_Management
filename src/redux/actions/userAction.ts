import { USERS_LOADED, USER_LOADED, USER_CREATE, USER_DELETE, USER_UPDATE } from '../type';
import {loadAPI} from '../../utils/apiService.utils';
import { User } from '../../types/Model';

export const getAllUser = (pageNumber: string) => (dispatch: any) => {
  const params = {
    'pageSize': 5,
    'pageNumber': pageNumber
  }
  return loadAPI('/users?', params, 'GET')
          .then(res => {
            dispatch({type: USERS_LOADED, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const getUser = (list: User[], id: number) => (dispatch: any): User => {
  const user = list.filter((user: User) => user.id === id);
  dispatch({ type: USER_LOADED, payload: user[0] });
  return user[0];
}

export const createUser = (data: User) => (dispatch: any) => {
  return loadAPI('/users?', data, 'POST')
          .then(res => {
            dispatch({type: USERS_LOADED, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const updateUser = (data: User, id: number) => (dispatch: any) => {
  return loadAPI(`/users/${id}`, data, 'PUT')
          .then(res => {
            dispatch({type: USER_UPDATE, payload: res.data});
            return res.status;
          })
          .catch(err => err.response.status);
}

export const deleteUser = (id: number) => (dispatch: any) => {
  return loadAPI(`/users/${id}`, null, 'DELETE')
          .then(res => {
            dispatch({type: USER_DELETE, payload: id});
            return res.status;
          })
          .catch(err => err.response.status);
}