import React from "react";
import Button from "@mui/material/Button";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { editFormation } from "../../js/actions/formation";
import Box from "@mui/material/Box";
import UpdateIcon from "@mui/icons-material/Update";
import { getAllUsers } from "../../js/actions/user";
import { useEffect } from "react";

const ModiferFormation = ({ form }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formations = useSelector((state) => state.formationReducer.formation);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [getAllUsers]);
  const users = useSelector((state) => state.userReducer.compte);
  let profs = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].role === "proffeseur") {
      profs.push(users[i]);
    }
  }

  const currentFor = formations.find((p) => p._id == form);
  const [formation, setForma] = useState({
    nom: currentFor.nom ? currentFor.nom : "",
    description: currentFor.description ? currentFor.description : "",
    type: currentFor.type ? currentFor.type : "",
    duree: currentFor.duree ? currentFor.duree : "",
    prix: currentFor.prix ? currentFor.prix : "",
    date_debut: currentFor.date_debut ? currentFor.date_debut : "",
    date_fin: currentFor.date_fin ? currentFor.date_fin : "",
    img: currentFor.img ? currentFor.img : "",
    proffeseur: currentFor.proffeseur ? currentFor.proffeseur : "",
  });
  const fileChanged = (e) => {
    e.preventDefault();
    setForma({ ...formation, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setForma({ ...formation, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editFormation({ id: form }, formation));
  };
  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleShow}>
        <UpdateIcon />
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
              defaultValue={formation.nom}
              name='nom'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
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
              label='description'
              defaultValue={formation.description}
              name='description'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-require'
              label='type'
              defaultValue={formation.type}
              name='type'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-require'
              label='duree'
              defaultValue={formation.duree}
              name='duree'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-require'
              label='prix'
              defaultValue={formation.prix}
              name='prix'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              required
              id='outlined-require'
              label='date_debut'
              defaultValue={formation.date_debut}
              name='date_debut'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />

            <TextField
              required
              id='outlined-require'
              label='date_fin'
              defaultValue={formation.date_fin}
              name='date_fin'
              onChange={handleChange}
              InputProps={{
                readOnly: false,
              }}
            />
            <TextField
              id='outlined-select-currency-native'
              select
              label='formateur'
              name='proffeseur'
              defaultValue={formation.proffeseur}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              variant='outlined'
            >
              <option disabled>-- selectioner un professeur --</option>
              {profs.map((prof) => (
                <option key={prof._id} value={prof._id}>
                  {prof.nom}
                </option>
              ))}
            </TextField>
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

export default ModiferFormation;
