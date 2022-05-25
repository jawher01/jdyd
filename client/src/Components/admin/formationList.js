import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFormation } from "../../js/actions/formation";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Formation from "./formation";
import ModalAjoutFormation from "./ModalAjoutFormation";
import Acceil from  "../loyout/acceil";
const PublicationList = () => {
  const dispatch = useDispatch();
  const formations = useSelector((state) => state.formationReducer.formation);
  const loadformation = useSelector(
    (state) => state.formationReducer.loadformations
  );
  const user = useSelector((state) => state.userReducer.user);
  const isOwner = user.role === "modirateur" || user.role ==="admin superieur" || user.role ==="editeur"
  useEffect(() => {
    dispatch(getAllFormation());
  }, [getAllFormation]);

  return (
    <div>
      <div>
     <Acceil/>
      </div>
      {isOwner && (
      <div style={{ marginLeft: "20%", marginTop: "5%" }}>
        <ModalAjoutFormation />
      </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "5%",
          marginBottom: "10%",

          width: "100%",
        }}
      >
        {loadformation ? (
          <Spinner animation='border' variant='info'>
            <span className='sr-only'></span>
          </Spinner>
        ) : (
          formations.map((el) => <Formation key={el._id} formation={el} />)
        )}
      </div>
    </div>
  );
};

export default PublicationList;
