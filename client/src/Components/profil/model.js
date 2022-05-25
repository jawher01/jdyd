import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editUser } from "../../js/actions/user";

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
  const user = useSelector((state) => state.userReducer.user);
 
  const [users, setUsers] = useState({
    
    nom: user.nom ? user.nom : "",
    prenom: user.prenom ? user.prenom : "",
    adresse: user.adresse ? user.adresse : "",
    niveau_scolaire: user.niveau_scolaire ? user.niveau_scolaire : "",
    receipt: user.receipt ? user.receipt :[],
    num_tel: user.num_tel ? user.num_tel : "",
  })
  
  const handleChange = (e) => {
    e.preventDefault();
    setUsers({ ...users, [e.target.name]:e.target.value});
  };
  
  const fileChanged = (e) => {
    e.preventDefault();
    setUsers({ ...users, [e.target.name]:(e.target.files[0])});
  };
 
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: user._id }, users));
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>modifier</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            modifier profil
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
            name="receipt"
            onChange={fileChanged}
            type="file"
           
          />
              <TextField
                required
                id='outlined-required'
                label='nom'
                defaultValue={users.nom}
                name="nom"
                onChange={handleChange}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-require'
                label='prenom'
                defaultValue={users.prenom}
                name="prenom"
                onChange={handleChange}
                InputProps={{
                  readOnly: false,
                }}
              />
              <div>
                <TextField
                  id='filled-required'
                  label='adresse'
                  defaultValue={users.adresse}
                  name="adresse"
                  onChange={handleChange}
                  InputProps={{
                    readOnly: false,
                  }}
                />
                <TextField
                  id='filled-disabled'
                  label='num_tel'
                  defaultValue={users.num_tel}
                  name="num_tel"
                  onChange={handleChange}
                  InputProps={{
                    readOnly: false,
                  }}
                />

                <TextField
                  id='filled-read-only-input'
                  label='niveau_scolaire'
                  defaultValue={users.niveau_scolaire}
                  name="niveau_scolaire"
                  onChange={handleChange}
                  InputProps={{
                    readOnly: false,
                  }}
                />
              </div>
            </Box>
            <Button variant='contained' onClick={submitHandler}>
              modifier
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
