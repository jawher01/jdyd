import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../js/actions/user";
import { getAllFormation } from "../../js/actions/formation";
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

export default function BasicModal() {
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("proffeseur");
  const [forma, setForma] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    dispatch(getAllFormation());
  }, []);

  const formations = useSelector((state) => state.formationReducer.formation);
 
  return (
   
    <div>
      <Button onClick={handleOpen} variant='contained'>Ajouter</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ajouter un user
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
                id='outlined-require'
                label='prenom'
                defaultValue=''
                onChange={(e) => setPrenom(e.target.value)}
              />
              <div>
                <TextField
                  id='filled-required'
                  label='email'
                  defaultValue=''
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  type='password'
                  id='filled-disabled'
                  label='password'
                  defaultValue=''
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  id='filled-read-only-input'
                  label='role'
                  defaultValue={role}
                  
                  InputProps={{
                    readOnly: false,
                  }}
                />
                <TextField
                id='outlined-select-currency-native'
                select
                label='formation'
                value={forma}
                onChange={(e) => setForma(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
              >
                <option disabled>-- selectioner un formation --</option>
                {formations.map((formation) => (
                  <option key={formation._id} value={formation._id}>
                    {formation.nom}
                  </option>
                ))}
              </TextField>
               
              </div>
            </Box>
            <Button
              variant='contained'
              type='submit'
              onClose={handleClose}
              onClick={() =>
                dispatch(registerUser({ nom, prenom, email, password, role,forma}))
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
