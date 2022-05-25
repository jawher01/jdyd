import {
  GET_CLASSES_LOAD,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILED,
  EDIT_CLASSE,
  DELETE_CLASSE,
} from "../const/classe";

const initialeState = {
  classe: [],
  loadclasses: false,
  errors: null,
  user: [],
  editclasse: "",
};

export const classeReducer = (state = initialeState, { type, payload }) => {
  switch (type) {
    case GET_CLASSES_LOAD:
      return { ...state, loadclasses: true };
    case GET_CLASSES_SUCCESS:
      return { ...state, classe: payload, loadclasses: false };
    case GET_CLASSES_FAILED:
      return { ...state, loadclasses: false, errors: payload };
    case DELETE_CLASSE:
      return { ...state, user: payload };
    case EDIT_CLASSE:
      return { ...state, loadclasses: false, classe: payload };
    default:
      return state;
  }
};
