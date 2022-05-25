import axios from "axios";
import {
  GET_FORMATIONS_FAILED,
  GET_FORMATIONS_SUCCES,
  GET_FORMATIONS_LOAD,
  GET_FORMATION,
  EDIT_FORMATION
} from "../const/formation";

export const getAllFormation = () => async (dispatch) => {
  dispatch({ type: GET_FORMATIONS_LOAD });
  try {
    let result = await axios.get("http://localhost:6500/formation");
    dispatch({ type: GET_FORMATIONS_SUCCES, payload: result.data.response });
  } catch (errors) {
    dispatch({ type: GET_FORMATIONS_FAILED, payload: errors });
  }
};

export const deleteFormation = (id) => async (disaptch) => {
  axios
    .delete(`http://localhost:6500/formation/${id}`)
    .then((res) => disaptch(getAllFormation()))
    .then(() => alert("formation supprimer avec succes"))
    .catch((err) => console.log(err));
};


export const postFormation = (user) => async (dispatch) => {

  let formData = new FormData();
  formData.append("nom", user.nom);
  formData.append("img", user.img.img);
  formData.append("description", user.description);
  formData.append("prix", user.prix);
  formData.append("type", user.type);
  formData.append("duree", user.duree);
  formData.append("date_debut", user.date_debut);
  formData.append("date_fin", user.date_fin);
  formData.append("proffeseur", user.proffeseur);
  
  axios
    .post("http://localhost:6500/formation", formData)
    .then((res) => dispatch(getAllFormation()))
    .then(() => alert("formation ajouter avec succes"))
    .catch((err) => alert(err));
};

export const getformation = (id) => (dispatch) => {
  axios
    .get(`http://localhost:6500/formation/${id}`)
    .then((res) =>
      dispatch({ type: GET_FORMATION, payload: res.data.response })
    )
    .catch((err) => console.log(err));
};

export const editFormation = (id, formation) => (dispatch) => {
  console.log(formation.proffeseur)
  let formData = new FormData();
  formData.append("nom", formation.nom);
  formData.append("prix", formation.prix);
  formData.append("img", formation.img);
  formData.append("description", formation.description);
  formData.append("type", formation.type);
  formData.append("duree", formation.duree);
  formData.append("date_debut", formation.date_debut);
  formData.append("date_fin", formation.date_fin);
  formData.append("proffeseur", formation.proffeseur._id);
  axios
    .put(`http://localhost:6500/formation/${id.id}`, formData)
    .then((res) => {
      alert("formation modifier avec succes");
      dispatch({
        type: EDIT_FORMATION,
        payload: { ...res.data.user},
      });
    })
    .catch((err) => console.log(err));
};