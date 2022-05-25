import React from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    deleteFormation,
  } from "../../js/actions/formation";


  
const ModalSupFor = ({formation}) => {
   
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeFor=()=>{
    dispatch(deleteFormation(formation))
  }
  
 


  return (
    <div>
  
    <Button variant='outlined' color='error' onClick={handleShow}>
    <DeleteForeverIcon/>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>supression</Modal.Title>
        </Modal.Header>
        <Modal.Body>vous étes sure que vus aller suprrimer cette formation</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            fermer
          </Button>
          <Button variant='primary' onClick={()=>removeFor()
         
        } >
            supprimer
          </Button>
        </Modal.Footer>
      </Modal>    
    </div>
  );
};

export default ModalSupFor;
