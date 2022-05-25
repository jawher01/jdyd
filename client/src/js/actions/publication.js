import axios from "axios";
import {
  GET_PUBLICATIONS_FAILED,
  GET_PUBLICATIONS_SUCCESS,
  GET_PUBLICATIONS_LOAD,
  GET_PUBLICATION,
  EDIT_PUBLICATION,
  LIKE_POST,
  UNLIKE_POST,
 
} from "../const/publication";

export const getAllPublications = () => async (dispatch) => {
  dispatch({ type: GET_PUBLICATIONS_LOAD });
  try {
    let result = await axios.get("http://localhost:6500/user/publication");
    dispatch({ type: GET_PUBLICATIONS_SUCCESS, payload: result.data.response });
  } catch (error) {
    dispatch({ type: GET_PUBLICATIONS_FAILED, payload: error });
  }
};
export const deletePublication = (id) => async (dispatch) => {
  axios
    .delete(`http://localhost:6500/user/publication/${id}`)
    .then((res) => dispatch(getAllPublications()))
    .then(() => alert("Publication supprimer avec succes"))
    .catch((err) => console.log(err));
};

export const getPublication = (id) => (dispatch) => {
  axios
    .get(`http://localhost:6500/user/publication/${id}`)
    .then((res) =>
      dispatch({ type: GET_PUBLICATION, payload: res.data.response })
    )
    .catch((err) => console.log(err));
};

export const postPublication = (user) => async (dispatch) => {
 
  let formData = new FormData();
  formData.append("nom", user.nom);
  formData.append("titre", user.titre);
  formData.append("content", user.content);
  formData.append("user", user.user._id);
  formData.append("img", user.img.img);
  axios
    .post("http://localhost:6500/user/publication", formData)
    .then((res) => dispatch(getAllPublications()))
    .then(() => alert("Publication ajouter avec succes"))
    .catch((err) => alert(err));
};

export const editPublication = (id, publication) => (dispatch) => {
  let formData = new FormData();
  formData.append("nom", publication.nom);
  formData.append("titre", publication.titre);
  formData.append("content", publication.content);
  formData.append("img", publication.img);
  axios
    .put(`http://localhost:6500/user/publication/${id.id}`, formData)
    .then((res) => {
      alert("Publication modifier avec succes");

      dispatch({
        type: EDIT_PUBLICATION,
        payload: { ...res.data.user },
      });
    })
    .catch((err) => console.log(err));
};

export const addComment = (comment) => {
  axios
    .post(`http://localhost:6500/user/publication/comment`, comment)
    .then((res) => {
      alert("comment ajouter avec succes");
    })
    .catch((err) => console.log(err));
};
export const likePost = (pub, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:`http://localhost:6500/user/publication/likepost/${pub}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { pub, userId } });
      })
      .catch((err) => console.log(err));
  };
};
export const unlikePost = (pub, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `http://localhost:6500/user/publication/unlikepost/${pub}`,
        data: { id: userId },
      });
      dispatch({ type: UNLIKE_POST, payload: { pub, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};