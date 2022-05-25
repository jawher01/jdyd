//import constants
import {
  GET_PUBLICATIONS_FAILED,
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_LOAD,
  GET_PUBLICATION,
  EDIT_PUBLICATION,
  LIKE_POST,
  UNLIKE_POST,
} from "../const/publication";
//initial state
const initialeState = {
  publication: [],
  loadPublications: false,
  errors: null,
  user: [],
  editPublication: "",
};

export const publicationReducer = (
  state = initialeState,
  { type, payload }
) => {
  switch (type) {
    case GET_PUBLICATIONS_LOAD:
      return { ...state, loadPublications: true };
    case GET_PUBLICATIONS_SUCCESS:
      return { ...state, publication: payload, loadPublications: false };
    case GET_PUBLICATIONS_FAILED:
      return { ...state, loadPublications: false, errors: payload };
    case GET_PUBLICATION:
      return { ...state, user: payload };
    case EDIT_PUBLICATION:
      return {
        ...state,
        publication: state.publication.map((p) =>
          p._id !== payload._id ? p : { ...p, ...payload }
        ),
      };
      case LIKE_POST:
        return state.map((post) => {
          if (post._id === payload.postId) {
            return {
              ...post,
              likers: [payload.userId, ...post.likers],
            };
          }
          return post;
        });
      case UNLIKE_POST:
        return state.map((post) => {
          if (post._id ===payload.postId) {
            return {
              ...post,
              likers: post.likers.filter((id) => id !== payload.userId),
            };
          }
          return post;
        });

    default:
      return state;
  }
};
