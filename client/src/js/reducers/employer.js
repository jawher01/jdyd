import {
    GET_EMPLOYERS_FAILED,
    GET_EMPLOYERS_SUCCESS,
    GET_EMPLOYERS_LOAD,
    DELETE_EMPLOYER,
    GET_EMPLOYER,
    EDIT_EMPLOYER,
  } from "../const/employer";
  
  const initialeState = {
    employer: [],
    loademployers: false,
    errors: null,
    user: [],
    editemployer: "",
  };
  
  export const employerReducer = (state = initialeState, { type, payload }) => {
    switch (type) {
      case GET_EMPLOYERS_LOAD:
        return { ...state, loademployers: true };
      case GET_EMPLOYERS_SUCCESS:
        return { ...state, employer: payload, loademployers: false };
      case GET_EMPLOYERS_FAILED:
        return { ...state, loademployers: false, errors: payload };
      case GET_EMPLOYER:
        return { ...state, user: payload };
      case DELETE_EMPLOYER:
        return { ...state, user: payload };
      case EDIT_EMPLOYER:
        return { ...state, loademployers: false, employer: payload };
      default:
        return state;
    }
  };
  