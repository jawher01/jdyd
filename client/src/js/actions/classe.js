import axios from "axios"
import {
  GET_CLASSES_FAILED,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_LOAD,
  EDIT_CLASSE,
  DELETE_CLASSE
}from "../const/classe"


export const getAllClasses=()=>async (dispatch)=>{
     dispatch({type:GET_CLASSES_LOAD})
   try {
       let result=await axios.get("http://localhost:6500/classe")
       dispatch({type:GET_CLASSES_SUCCESS,payload:result.data.response})

   } catch (error) {
       dispatch({type:GET_CLASSES_FAILED,payload:error})
   }
}


export const postClasse=(user)=>async (dispatch)=>{

    axios
      .post("http://localhost:6500/classe", user)
      .then((res) => dispatch(getAllClasses()))
      .then(() => alert("classe ajouter avec succes"))
      .catch((err) => alert(err));
 
}


export const editClasse = (id, classe) => (dispatch) => {
  axios
    .put(`http://localhost:6500/classe/${id.id}`, classe)
    .then((res) => {
      alert("classe modifier avec succes");
      dispatch({
        type: EDIT_CLASSE,
        payload: { ...res.data.user},
      });
    })
    .catch((err) => console.log(err));
};

export const deleteClasse = (id) => async (disaptch) => {
  axios
    .delete(`http://localhost:6500/classe/${id}`)
    .then((res) => disaptch(getAllClasses()))
    .then(() => alert("classe supprimer avec succes"))
    .catch((err) => console.log(err));
};