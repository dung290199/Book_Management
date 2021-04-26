import axios from './axios.utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../redux/store';

const authHeader = () => {
  const state = store.getState();
  const token = store ? state.authReducer.token : null;
  const isLogin = store ? state.authReducer.isLogin : false;
  return {
    'Authorization': (isLogin && token) ? `Bearer ${token}` : null
  };
}

const configReq = (options: object, methodName: string): AxiosRequestConfig => {
  switch (methodName.toUpperCase()) {
    case 'PUT':
      return {
        method: 'PUT',
        ...options
      }
    case 'DELETE':
      return {
        method: 'DELETE',
        ...options
      }
    case 'POST':
      return {
        method: 'POST',
        ...options
      }
    default: 
      return {
        method: 'GET',
        ...options
      }
  }
}

export const loadAPI = (url: string, params: any, method: string) => {
  let options = {
    url: url,
    headers: authHeader(),
    params: null,
    data: null
  }

  method == 'GET' ? options.params = params : options.data = params;

  const requestOptions: AxiosRequestConfig = configReq(options, method);

  return new Promise<AxiosResponse> ((resolve, reject)=>{
    axios(requestOptions)
    .then(res => {
      resolve(res)})
    .catch(reject);
  });
}