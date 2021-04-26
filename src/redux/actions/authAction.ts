import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../type';
import axios from '../../utils/axios.utils';

export const login = ( data: any, props: any ) => ( dispatch: any ) => {
  console.log("login");
  return axios.post(
    '/auths/login',
    {
      username: data.username,
      password: data.password
    })
    .then(res => {      
      dispatch(
        {
          type: LOGIN_SUCCESS,
          payload: {
            token: res.data.token,
            user: res.data.user
          }
        }
      )
      props.history.push('/home');
    })
    .catch(err => dispatch(
      {
        type: LOGIN_FAIL,
        payload: "Login fail!"
      }
    ));
};

export const logout = () => (dispatch: any) => {
  localStorage.clear();
  return dispatch({
    type: LOGOUT
  })
};
