import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    deleteClasse,
  
    
  } from "../../js/actions/classe";


  
const ModelsupClasse = ({classe}) => {
   
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeFor=()=>{
    dispatch(deleteClasse(classe))
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
        <Modal.Body>vous étes sure que vus aller suprrimer cette classe</Modal.Body>
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

export default ModelsupClasse;