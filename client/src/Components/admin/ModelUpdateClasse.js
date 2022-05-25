import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { editClasse } from "../../js/actions/classe";
import Box from "@mui/material/Box";
import UpdateIcon from '@mui/icons-material/Update';
const ModelUpdateClasse = ({ cl }) => {
    
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const classes = useSelector(
    (state) => state.classeReducer.classe
  );
  const currentCl = classes.find((p) => p._id == cl);
  const [classe, setClasse] = useState({
    nom: currentCl.nom ? currentCl.nom : "",
    duree: currentCl.duree ? currentCl.duree : "",
    nb_heure: currentCl.nb_heure ? currentCl.nb_heure : "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editClasse({ id: cl }, classe));
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
              defaultValue={classe.nom}
              name='nom'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
            required
            id='outlined-require'
            label='duree'
            defaultValue={classe.duree}
            name='duree'
            onChange={handleChange}
            InputProps={{
              readOnly: false,
            }}
          />
          <TextField
          required
          id='outlined-require'
          label='nb_heure'
          defaultValue={classe.nb_heure}
          name='nb_heure'
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

export default ModelUpdateClasse;
