import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../type';

const initialState: any = {
  token: null,
  user: null,
  isLogin: false
};

const authReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload,
          isLogin: true
      });
    case LOGIN_FAIL:
    case LOGOUT: 
      return Object.assign({}, state, initialState);
  }

  return state;
}

export default authReducer;