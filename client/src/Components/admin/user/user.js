import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../js/actions/user";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Acceil from "../../loyout/acceil";
import { Table} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Model from "./AjouteUser"
import Suprimer from "./SuprimerUser"
const User = () => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [getAllUsers]);
  const users = useSelector((state) => state.userReducer.compte);
  const loadUser = useSelector((state) => state.userReducer.loadUser);
  let mods = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "modirateur" ) {
        mods.push(users[i]);
    }
  }
  let edits = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "editeur" ) {
        edits.push(users[i]);
    }
  }
  let Tabs=mods.concat(edits)
 
  return (
    <div>
      <div>
        <div>
          <Acceil />
        </div>
        <div style={{ marginBottom: "2%", marginTop: "2%", marginLeft: "15%" }}>
          <div style={{ marginBottom: "2%", marginTop: "2%" }}>
           <Model/>
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
                  <th>salaire</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {Tabs.map((tab) => (
                  <tr>
                    <td>{tab.nom}</td>
                    <td>{tab.prenom}</td>
                    <td>{tab.email}</td>
                    <td>{tab.role}</td>
                    <td>{tab.salaire}</td>
                    <td >
                       <Suprimer user={tab._id}/>
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

export default User;