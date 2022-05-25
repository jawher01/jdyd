import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../js/actions/user";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Acceil from "../loyout/acceil";
import { Table } from "react-bootstrap";
import Modal from "./ModalAjoutProf";
import ModalSup from "./ModalSupUser";

const ProfesseurList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.compte);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  let profs = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "proffeseur") {
      profs.push(users[i]);
    }
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [getAllUsers]);
  return (
    <div>
      <div>
        <div>
          <Acceil />
        </div>
        <div style={{ marginBottom: "2%", marginTop: "2%", marginLeft: "15%" }}>
          <div style={{ marginBottom: "2%", marginTop: "2%" }}>
            <Modal />
          </div>
          {loadUser ? (
            <Spinner animation='border' variant='info'>
              <span className='sr-only'></span>
            </Spinner>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>nom </th>
                  <th>prenom</th>
                  <th>email</th>
                  <th>role</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {profs.map((prof) => (
                  <tr>
                    <td>{prof.nom}</td>
                    <td>{prof.prenom}</td>
                    <td>{prof.email}</td>
                    <td>{prof.role}</td>
                    <td>
                      <ModalSup prof={prof} />
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

export default ProfesseurList;
