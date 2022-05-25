import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";


import { deleteEvenement } from "../../../js/actions/evenement";

const ModalSupression = ({ eve }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeEve = () => {
    dispatch(deleteEvenement(eve));
  };

  return (
    <div>
      <Button variant='outlined' color='error' onClick={handleShow}>
        <DeleteForeverIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>supression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          vous étes sure que vus aller suprrimer cette evenement
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            fermer
          </Button>
          <Button variant='primary' onClick={() => removeEve()}>
            supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalSupression;
