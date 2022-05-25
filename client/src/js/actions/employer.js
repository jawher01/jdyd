import axios from "axios";
import {
    GET_EMPLOYERS_FAILED,
    GET_EMPLOYERS_SUCCESS,
    GET_EMPLOYERS_LOAD,
    DELETE_EMPLOYER,
    GET_EMPLOYER,
    EDIT_EMPLOYER,
  } from "../const/employer";
  
export const getAllEmployer = () => async (dispatch) => {
  dispatch({ type: GET_EMPLOYERS_LOAD });
  try {
    let result = await axios.get("http://localhost:6500/employer");
    dispatch({ type: GET_EMPLOYERS_SUCCESS, payload: result.data.response });
  } catch (errors) {
    dispatch({ type: GET_EMPLOYERS_FAILED, payload: errors });
  }
};

export const deleteEmployer = (id) => async (disaptch) => {
  axios
    .delete(`http://localhost:6500/employer/${id}`)
    .then((res) => disaptch(getAllEmployer()))
    .then(() => alert("employer supprimer avec succes"))
    .catch((err) => console.log(err));
};


export const postEmployer = (user) => async (dispatch) => {
  axios
    .post("http://localhost:6500/employer", user)
    .then((res) => dispatch(getAllEmployer()))
    .then(() => alert("employer ajouter avec succes"))
    .catch((err) => alert(err));
};

export const getEmployer = (id) => (dispatch) => {
  axios
    .get(`http://localhost:6500/employer/${id}`)
    .then((res) =>
      dispatch({ type: GET_EMPLOYER, payload: res.data.response })
    )
    .catch((err) => console.log(err));
};

export const editEmployer = (id, employer) => (dispatch) => {
  console.log(employer)
  axios
    .put(`http://localhost:6500/employer/${id.id}`, employer)
    .then((res) => {
      alert("employer modifier avec succes");
      dispatch({
        type: EDIT_EMPLOYER,
        payload: { ...res.data.user},
      });
    })
    .catch((err) => console.log(err));
};