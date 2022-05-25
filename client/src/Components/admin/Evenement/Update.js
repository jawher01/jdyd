import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UpdateIcon from '@mui/icons-material/Update';
import { editEvenement } from "../../../js/actions/evenement";
const Update = ({ eve }) => {
  
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const evenements = useSelector(
    (state) => state.evenementReducer.evenement
  );
  const currentEve= evenements.find((p) => p._id == eve);
  console.log(currentEve)
  const [evenement, setEvenement] = useState({
    nom: currentEve ? currentEve.nom : "",
    description: currentEve ? currentEve.description : "",
    img: currentEve.img ? currentEve.img : "",
    participant: currentEve.participant ? currentEve.participant :[],
  });
 
  const fileChanged = (e) => {
    e.preventDefault();
    setEvenement({ ...evenement, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setEvenement({ ...evenement, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editEvenement({ id: eve }, evenement));
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
          id='outlined-required'
          label='image'
          name="img"
          onChange={fileChanged}
          type="file"
         
        />
            <TextField
              required
              id='outlined-require'
              label='nom'
              defaultValue={evenement.nom}
              name='nom'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-required'
              label='description'
              defaultValue={evenement.description}
              name='description'
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

export default Update;
