import {
    GET_EVENEMENTS_SUCCESS,
    GET_EVENEMENTS_LOAD,
    GET_EVENEMENTS_FAILED,
    DELETE_EVENEMENT,
    EDIT_EVENEMENT,
    GET_EVENEMENT,
    PARTICIPE,
    UNPARTICIPE
  } from "../const/evenement";
  
  const initialeState = {
    evenement: [],
    loadevenement: false,
    errors: null,
    user: [],
    editevenement: "",
  };
  
  export const evenementReducer = (state = initialeState, { type, payload }) => {
    switch (type) {
      case GET_EVENEMENTS_LOAD:
        return { ...state, loadevenement: true };
      case GET_EVENEMENTS_SUCCESS:
        return { ...state, evenement: payload, loadevenement: false };
      case GET_EVENEMENTS_FAILED:
        return { ...state, loadevenement: false, errors: payload };
      case GET_EVENEMENT:
        return { ...state, user: payload };
      case DELETE_EVENEMENT:
        return { ...state, user: payload };
      case EDIT_EVENEMENT:
        return { ...state, loademployers: false, evenement: payload };
        case PARTICIPE:
          return state.map((eve) => {
            if (eve._id === payload.eveId) {
              return {
                ...eve,
                participant: [payload.userId, ...eve.participant],
              };
            }
            return eve;
          });
        case UNPARTICIPE:
          return state.map((eve) => {
            if (eve._id ===payload.eveId) {
              return {
                ...eve,
                participant: eve.participant.filter((id) => id !== payload.userId),
              };
            }
            return eve;
          });
  
      default:
        return state;
    }
  };
  