import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postPublication } from "../../js/actions/publication";

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
  const [nom, setNom] = useState(user.nom);
  const [titre, setTitre] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fileChanged = (e) => {
    e.preventDefault();
    setImg({[e.target.name]:(e.target.files[0])});
  };

  return (
    <div>
      <div style={{marginLeft:"2%"}}>
        <Button variant='contained' onClick={handleOpen}>
          Ajouter un publication
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
            ajouter un publication
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
            name="img"
            onChange={fileChanged}
            type="file"
          />
              <TextField
                required
                id='outlined-required'
                label='nom'
                defaultValue={user.nom}
                onChange={(e) => setNom(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
              <TextField
                required
                id='outlined-require'
                label='titre'
                defaultValue=''
                onChange={(e) => setTitre(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />

              <TextField
                id='filled-required'
                label='content'
                defaultValue=''
                onChange={(e) => setContent(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </Box>
            <Button
              variant='contained'
              type='submit'
              onClick={() =>
                dispatch(postPublication({ nom, titre, content, user ,img}))
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
