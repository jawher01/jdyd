import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postEvenement } from "../../../js/actions/evenement";

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
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const fileChanged = (e) => {
    e.preventDefault();
    setImg({ [e.target.name]: e.target.files[0] });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div style={{marginLeft:"2%"}}>
        <Button variant='contained' onClick={handleOpen}>
          Ajouter un evenement
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            ajouter un evenement
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
                defaultValue=""
                onChange={(e) => setNom(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-require'
                label='description'
                defaultValue=''
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />

            
            </Box>
            <Button
              variant='contained'
              type='submit'
              onClick={() =>
                dispatch(postEvenement({ nom,description,img}))
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
