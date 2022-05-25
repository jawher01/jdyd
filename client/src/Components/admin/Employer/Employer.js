import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEmployer } from "../../../js/actions/employer";
import { Spinner } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { useEffect } from "react";
import Acceil from "../../loyout/acceil";
import Post from "./AjoutEmployer"
import Suprimer from "./SuprimerEmployer"
import Modifier from "./ModifierEmployer"
const Employer = () => {
  const dispatch = useDispatch();
  const employers = useSelector((state) => state.employerReducer.employer);

  const loademployers = useSelector((state) => state.employerReducer.loademployer);
 
  useEffect(() => {
    dispatch(getAllEmployer());
  }, [getAllEmployer]);
  return (
    <div>
      <div>
        <div>
          <Acceil />
        </div>
        <div style={{ marginLeft: "23%", marginTop: "5%" }}>
          <Post />
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
          {loademployers ? (
            <Spinner animation='border' variant='info'>
              <span className='sr-only'></span>
            </Spinner>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>nom </th>
                  <th>prenom</th>
                  <th>poste</th>
                  <th>salaire</th>
                  <th>rib</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {employers.map((employer) => (
                  <tr>
                    <td>{employer.nom}</td>
                    <td>{employer.prenom}</td>
                    <td>{employer.poste}</td>
                    <td>{employer.salaire}</td>
                    <td>{employer.rib}</td>
                    <td style={{ display: "flex", flexDirection: "row"}}>
                    <div  style={{ marginRight:"10%"}}> <Suprimer employer={employer._id}/></div>
                   <div> <Modifier emp={employer._id}/></div>
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

export default Employer;