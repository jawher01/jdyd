import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvenement } from "../../../js/actions/evenement";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Evenement from "./Evenement";
import Acceil from  "../../loyout/acceil";
import Ajoute from "./AjoutEven"
const EvenementList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvenement());
  }, [getAllEvenement]);
  const evenements = useSelector(
    (state) => state.evenementReducer.evenement
  );
  const loadEvenements = useSelector(
    (state) => state.evenementReducer.loadevenement
  );

  return (
    <div >
      <div style={{marginLeft:"0%"}}>
      <Acceil/>
      </div>

      <div style={{ marginLeft: "200px", marginTop: "5%" }}>
       <Ajoute/>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "5%",
            marginBottom: "20%",
           
          }}
        >
          {loadEvenements ? (
            <Spinner animation='border' variant='info'>
              <span className='sr-only'></span>
            </Spinner>
          ) : (
            evenements.map((el) => (
              <Evenement key={el._id} evenement={el} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EvenementList;
