import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublications } from "../../js/actions/publication";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Publication from "./publication";
import ModalAjoute from "./ModalAjoute";
import Acceil from "../loyout/acceil";

const PublicationList = () => {
  const dispatch = useDispatch();
  const publications = useSelector(
    (state) => state.publicationReducer.publication
  );
  const loadPublications = useSelector(
    (state) => state.publicationReducer.loadPublications
  );
  useEffect(() => {
    dispatch(getAllPublications());
  }, [getAllPublications]);
  return (
    <div >
      <div style={{ marginLeft: "0%" }}>
        <Acceil />
      </div>

      <div style={{ marginLeft: "200px", marginTop: "5%" }}>
        <ModalAjoute />

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
          {loadPublications ? (
            <Spinner animation='border' variant='info'>
              <span className='sr-only'></span>
            </Spinner>
          ) : (
            publications.map((el) => (
              <Publication key={el._id} publication={el} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationList;
