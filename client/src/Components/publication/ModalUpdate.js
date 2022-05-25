import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { editPublication } from "../../js/actions/publication";
import Box from "@mui/material/Box";
import UpdateIcon from '@mui/icons-material/Update';
const ModalUpdate = ({ pub }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const publications = useSelector(
    (state) => state.publicationReducer.publication
  );
  const currentPub = publications.find((p) => p._id == pub);
  const [publication, setPublication] = useState({
    content: currentPub ? currentPub.content : "",
    titre: currentPub ? currentPub.titre : "",
    img:currentPub ? currentPub.img : [],
  });
  const handleChange = (e) => {
    e.preventDefault();
    setPublication({ ...publication, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editPublication({ id: pub }, publication));
  };
  const fileChanged = (e) => {
    e.preventDefault();
    setPublication({ ...publication, [e.target.name]:(e.target.files[0])});
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
              label='titre'
              defaultValue={publication.titre}
              name='titre'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-required'
              label='content'
              defaultValue={publication.content}
              name='content'
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

export default ModalUpdate;
