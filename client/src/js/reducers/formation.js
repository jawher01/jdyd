import {
  GET_FORMATIONS_FAILED,
  GET_FORMATIONS_SUCCES,
  GET_FORMATIONS_LOAD,
  DELETE_FORMATION,
  GET_FORMATION,
  EDIT_FORMATION,
} from "../const/formation";

const initialeState = {
  formation: [],
  loadformations: false,
  errors: null,
  user: [],
  editformation: "",
};

export const formationReducer = (state = initialeState, { type, payload }) => {
  switch (type) {
    case GET_FORMATIONS_LOAD:
      return { ...state, loadformations: true };
    case GET_FORMATIONS_SUCCES:
      return { ...state, formation: payload, loadformations: false };
    case GET_FORMATIONS_FAILED:
      return { ...state, loadformations: false, errors: payload };
    case GET_FORMATION:
      return { ...state, user: payload };
    case DELETE_FORMATION:
      return { ...state, user: payload };
    case EDIT_FORMATION:
      return { ...state, loadformations: false, formation: payload };
    default:
      return state;
  }
};
