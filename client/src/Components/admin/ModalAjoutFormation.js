import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postFormation } from "../../js/actions/formation";
import { getAllUsers } from "../../js/actions/user";
import { useEffect } from "react";
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

export default function ModalAjoutFormation() {
  const dispatch = useDispatch();
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
  



  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [duree, setDuree] = useState("");
  const [prix, setPrix] = useState("");
  const [date_debut, setDate_debut] = useState("");
  const [date_fin, setDate_fin] = useState("");
  const [img, setImg] = useState("");
  const [proffeseur, setProf] = useState("");
  const fileChanged = (e) => {
    e.preventDefault();
    setImg({ [e.target.name]: e.target.files[0] });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div style={{ marginLeft: "0.5%"}}>
        <Button variant='contained' onClick={handleOpen}>
          Ajouter un formation
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{ overflowY: 'scroll' }}

      >
        <Box sx={style} >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ajouter un formation
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
                label='image'
                name='img'
                onChange={fileChanged}
                type='file'
              />
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
                id='outlinre'
                label='Description'
                defaultValue=''
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />

              <TextField
                id='filled-reqed'
                label='Type'
                defaultValue=''
                onChange={(e) => setType(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                id='fed-required'
                label='Duree'
                defaultValue=''
                onChange={(e) => setDuree(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                id='filled-reqd'
                label='Prix'
                defaultValue=''
                onChange={(e) => setPrix(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                id='filled-rquired'
                label='Date_debut'
                defaultValue=''
                onChange={(e) => setDate_debut(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                id='filled-requed'
                label='Date_fin'
                defaultValue=''
                onChange={(e) => setDate_fin(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
              id='outlined-select-currency-native'
              select
              label='formateur'
              defaultValue=''
              onChange={(e) => setProf(e.target.value)}
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

            <Button
              variant='contained'
              type='submit'
              onClick={() =>
                dispatch(
                  postFormation({
                    nom,
                    description,
                    type,
                    duree,
                    prix,
                    date_debut,
                    date_fin,
                    img,
                    proffeseur
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
