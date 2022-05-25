import axios from "axios";

import {
    GET_EVENEMENTS_SUCCESS,
    GET_EVENEMENTS_LOAD,
    GET_EVENEMENTS_FAILED,
    EDIT_EVENEMENT,
    GET_EVENEMENT,
    PARTICIPE,
    UNPARTICIPE
  } from "../const/evenement";
  
export const getAllEvenement = () => async (dispatch) => {
  dispatch({ type: GET_EVENEMENTS_LOAD });
  try {
    let result = await axios.get("http://localhost:6500/evenement");
    dispatch({ type: GET_EVENEMENTS_SUCCESS, payload: result.data.response });
  } catch (errors) {
    dispatch({ type: GET_EVENEMENTS_FAILED, payload: errors });
  }
};

export const deleteEvenement = (id) => async (disaptch) => {
  axios
    .delete(`http://localhost:6500/evenement/${id}`)
    .then((res) => disaptch(getAllEvenement()))
    .then(() => alert("evenement supprimer avec succes"))
    .catch((err) => console.log(err));
};


export const postEvenement = (user) => async (dispatch) => {
  let formData = new FormData();
  formData.append("nom", user.nom);
  formData.append("description", user.description);
  formData.append("img", user.img.img);
  axios
    .post("http://localhost:6500/evenement", formData)
    .then((res) => dispatch(getAllEvenement()))
    .then(() => alert("evenement ajouter avec succes"))
    .catch((err) => alert(err));
};

export const getEvenement = (id) => (dispatch) => {
  axios
    .get(`http://localhost:6500/evenement/${id}`)
    .then((res) =>
      dispatch({ type: GET_EVENEMENT, payload: res.data.response })
    )
    .catch((err) => console.log(err));
};

export const editEvenement = (id, evenement) => (dispatch) => {
  let formData = new FormData();
  formData.append("nom", evenement.nom);
  formData.append("description", evenement.description);
  formData.append("img", evenement.img);
  formData.append("participant", evenement.participant);
  axios
    .put(`http://localhost:6500/evenement/${id.id}`, formData)
    .then((res) => {
      alert("employer modifier avec succes");
      dispatch({
        type: EDIT_EVENEMENT,
        payload: { ...res.data.user},
      });
    })
    .catch((err) => console.log(err));
};

export const participe = (eve, userId) => {
  console.log(eve)
  console.log(userId)
  return (dispatch) => {
    return axios({
      method: "patch",
      url:`http://localhost:6500/evenement/participe/${eve}`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type:PARTICIPE, payload: { eve, userId } });
      })
      .catch((err) => console.log(err));
  };
};
export const unParticipe = (eve, userId) => {
  console.log(eve)
  console.log(userId)
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: `http://localhost:6500/evenement/unparticipe/${eve}`,
        data: { id: userId },
      });
      dispatch({ type: UNPARTICIPE, payload: { eve, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};