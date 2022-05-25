import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllClasses } from "../../js/actions/classe";
import { Spinner } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import Modal from "./ModalAjouteClasse";
import Acceil from "../loyout/acceil";
import Model from "./ModelsupClasse"
import ModelUp from "./ModelUpdateClasse"
const Classes = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classeReducer.classe);
  const loadclasses = useSelector((state) => state.classeReducer.loadclasses);
 console.log(classes)



  useEffect(() => {
    dispatch(getAllClasses());
  }, [getAllClasses]);
  return (
    <div>
      <div>
        <div>
          <Acceil />
        </div>
        <div style={{ marginLeft: "23%", marginTop: "5%" }}>
          <Modal />
        </div>
        <div
          style={{
            marginTop: "5%",
            marginBottom: "20%",
            marginLeft: "23%",
            marginRight: "23%",
            width: "70%",
          }}
        >
          {loadclasses ? (
            <Spinner animation='border' variant='info'>
              <span className='sr-only'></span>
            </Spinner>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>nom </th>
                  <th>duree</th>
                  <th>nb-heure</th>
                  <th>formation</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classe) => (
                  
                  <tr>
                    <td>{classe.nom}</td>
                    <td>{classe.duree}</td>
                    <td>{classe.nb_heure}</td>
                    <td>
                        <div>{classe.formation.nom}</div>
                    </td>
                    <td style={{ display: "flex", flexDirection: "row"}}>
                        <div style={{ marginRight:"10%"}}> <Model  classe={classe._id}/></div>
                        <div> <ModelUp  cl={classe._id}/></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
