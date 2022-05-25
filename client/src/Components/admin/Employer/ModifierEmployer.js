import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import UpdateIcon from '@mui/icons-material/Update';
import Box from "@mui/material/Box";
import { editEmployer } from "../../../js/actions/employer";

const ModifierEmployer = ({ emp }) => {
    
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const employers = useSelector(
    (state) => state.employerReducer.employer
  );
  const currentEm = employers.find((p) => p._id == emp);
  const [employer, setEmployer] = useState({
    nom: currentEm.nom ? currentEm.nom : "",
    prenom: currentEm.prenom ? currentEm.prenom : "",
    salaire: currentEm.salaire ? currentEm.salaire : "",
    poste: currentEm.poste ? currentEm.poste : "",
    rib: currentEm.rib ? currentEm.rib : "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setEmployer({ ...employer, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editEmployer({ id: emp }, employer));
  };
  return (
    <div>
    <Button variant='outlined' color='primary' onClick={handleShow}>
    <UpdateIcon/>
    </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>mise a jour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              required
              id='outlined-require'
              label='nom'
              defaultValue={employer.nom}
              name='nom'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
            required
            id='outlined-require'
            label='prenom'
            defaultValue={employer.prenom}
            name='prenom'
            onChange={handleChange}
            InputProps={{
              readOnly: false,
            }}
          />
          <TextField
          required
          id='outlined-require'
          label='poste'
          defaultValue={employer.poste}
          name='poste'
          onChange={handleChange}
          InputProps={{
            readOnly: false,
          }}
        />
        <TextField
        required
        id='outlined-require'
        label='rib'
        defaultValue={employer.rib}
        name='rib'
        onChange={handleChange}
        InputProps={{
          readOnly: false,
        }}
      />
      <TextField
        required
        id='outlined-require'
        label='salaire'
        defaultValue={employer.salaire}
        name='salaire'
        onChange={handleChange}
        InputProps={{
          readOnly: false,
        }}
      />
         

        

    




          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            fermer
          </Button>

          <Button variant='primary' onClick={submitHandler}>
            mise a jour
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModifierEmployer;
