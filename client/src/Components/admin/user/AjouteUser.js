import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../js/actions/user";

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

export default function AjouteUser() {
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [salaire, setSalaire] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const editeur='editeur'
 const modirateur='modirateur'
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
                id='d-required'
                label='nom'
                defaultValue=''
                onChange={(e) => setNom(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-rre'
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
                  id='fid-disabled'
                  label='password'
                  defaultValue=''
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                id='fille-disaled'
                label='role'
                defaultValue=''
                onChange={(e) => setRole(e.target.value)}
                  variant='outlined'
                  SelectProps={{
                    native: true,
                  }}
                >
                
                  <option disabled >-- selectioner un role --</option>
                  <option disabled value={editeur}>editeur</option>
                  <option disabled value={modirateur}>modirateur</option>
               
                </TextField>
                <TextField
                id='fille-disaled'
                label='salaire'
                defaultValue=''
                onChange={(e) => setSalaire(e.target.value)}
              />
           


             




              </div>
            </Box>
            <Button
              variant='contained'
              type='submit'
              onClose={handleClose}
              onClick={() =>
                dispatch(registerUser({ nom, prenom, email, password, role,salaire}))
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
