import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getAllEmployer } from "../../../js/actions/employer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEmployer } from "../../../js/actions/employer";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AjoutEmployer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployer());
  }, []);

  const employers = useSelector((state) => state.employerReducer.employer);

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [salaire, setSalaire] = useState("");
  const [poste, setPoste] = useState("");
  const [rib, setRib] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>
        Ajouter un employer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ajouter un employer
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
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
                label='nom'
                defaultValue=''
                onChange={(e) => setNom(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='prenom'
                defaultValue=''
                onChange={(e) => setPrenom(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='poste'
                defaultValue=''
                onChange={(e) => setPoste(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='salaire'
                defaultValue=''
                onChange={(e) => setSalaire(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-required'
                label='rib'
                defaultValue=''
                onChange={(e) => setRib(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </Box>

            <Button
              variant='contained'
              type='submit'
              onClick={() =>
                dispatch(
                  postEmployer({
                    nom,
                    prenom,
                    salaire,
                    poste,
                    rib,
                  })
                )
              }
            >
              ajouter
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
