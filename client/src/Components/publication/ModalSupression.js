import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";

import { deletePublication } from "../../js/actions/publication";

const ModalSupression = ({ pub }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removePub = () => {
    dispatch(deletePublication(pub));
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
          vous étes sure que vus aller suprrimer cette publication
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            fermer
          </Button>
          <Button variant='primary' onClick={() => removePub()}>
            supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalSupression;
