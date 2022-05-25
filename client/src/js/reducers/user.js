import {
    LOAD_USER,
    REGISTER_USER,
    LOGIN_USER,
    FAIL_USER,
    LOGOUT_USER,
    CURRENT_USER,
    GET_USERS_LOAD,
    GET_USERS_SUCCESS,
    GET_USERS_FAILED,
    GET_USER,
    EDIT_USER,
 
  } from "../const/user";
  
  const initialState = {
    user: {},
    loadUser: false,
    errors: null,
    isAuth: false,
    compte:[]
  };
  
  export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case REGISTER_USER:
      
        return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOGIN_USER:
        localStorage.setItem("token", payload.token);
        return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOAD_USER:
        return { ...state, loadUser: true };
    case CURRENT_USER:
        return { ...state, loadUser: false, isAuth: true, user: payload };
    case FAIL_USER:
        return { ...state, loadUser: false, errors: payload };
    case LOGOUT_USER:
        localStorage.removeItem("token");
        return { user: null, loadUser: false, errors: null, isAuth: false };
    case GET_USERS_LOAD:
        return { ...state, loadUser: true };
    case GET_USERS_SUCCESS:
        return { ...state, compte: payload, loadUser: false };
    case GET_USERS_FAILED:
        return { ...state, loadUser: false, error: payload };
    case GET_USER:
                return { ...state, compte: payload};
    case EDIT_USER:            
                return { ...state,loadUser: false, compte:payload};
      default:
        return state;
    }
  };