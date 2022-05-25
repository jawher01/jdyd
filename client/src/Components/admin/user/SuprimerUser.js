import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteUser } from "../../../js/actions/user";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const SuprimerUser = (user) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant='outlined' color='error' onClick={handleShow}>
        <DeleteForeverIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Supression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>vous etes sure ??</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            fermer
          </Button>

          <Button
            variant='primary'
            onClick={() => dispatch(deleteUser(user.user))}
          >
            confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuprimerUser;
